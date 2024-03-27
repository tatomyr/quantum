import { render, sanitize } from "../../../index.js";
import { handleError } from "../services/error.js";
import { fetchAndNormalizeImages } from "../services/images.js";
import { cropSquare, getImgSrc, keepRatio } from "../services/image-processing.js";
import { selectDetailedTask } from "../services/task-details.js";
import { patchTask } from "../services/tasks.js";
import { IMAGES } from "../config/images.js";
import { SMALL_BUTTON, subtaskItem } from "./subtask-item.js";
import { ACTION_BUTTON } from "./app-style.js";
import { taskDetailsStyle } from "./task-details-style.js";
const makeChangeImage = (direction) => async () => {
    const task = selectDetailedTask();
    patchTask({ ...task, isImageLoading: true });
    try {
        const image = await fetchAndNormalizeImages(task, direction === "current" ? 1 : task.image.queries[direction]?.startIndex);
        await patchTask({ ...task, image });
    }
    catch (err) {
        handleError(err);
        patchTask(task);
    }
};
const handleCaptureImage = async ({ target }) => {
    try {
        const [file] = target.files;
        if (!file) {
            return;
        }
        const task = selectDetailedTask();
        const bigImg = await window.createImageBitmap(file);
        const smallImg = await window.createImageBitmap(bigImg, {
            ...keepRatio(bigImg)(300),
            resizeQuality: "high",
        });
        const croppedImg = await window.createImageBitmap(smallImg, ...cropSquare(smallImg));
        const link = getImgSrc(croppedImg);
        if (!link)
            throw new Error("Cannot read the image.");
        const image = {
            link,
            queries: {
                previousPage: task?.image.queries.request,
            },
        };
        patchTask({ ...task, image });
    }
    catch (err) {
        handleError(err);
    }
};
const handleEditTaskDescription = e => {
    const task = selectDetailedTask();
    console.log(e.target.value);
    patchTask({ id: task.id, description: sanitize(e.target.value) });
};
const handleAddSubtask = () => {
    const task = selectDetailedTask();
    patchTask({
        id: task.id,
        subtasks: [...(task.subtasks || []), { checked: false, description: "" }],
    });
    document
        .querySelector(".subtask:last-child input.subtask-input")
        ?.focus();
};
export const taskDetails = () => {
    const task = selectDetailedTask();
    return render `
    <div class="task-details--wrapper">
      <section class="task-details--image">
        <div
          id="fullscreen-image"
          class="fullscreen-image"
          style="background-image: url('${task.isImageLoading ? IMAGES.LOADING : task?.image.link}');"
        > 
          <div class="controls" id="controls">
            <button ::click=${makeChangeImage("current")}>
              ↻
            </button>
        
            ${task?.image.queries.previousPage?.startIndex !== undefined &&
        render `
                <button ::click=${makeChangeImage("previousPage")}>
                  ←
                </button>
              `}
            
            ${task?.image.queries.nextPage?.startIndex !== undefined &&
        render `
                <button ::click=${makeChangeImage("nextPage")}>
                  →
                </button>
              `}

            <label for="capture">
              Capture
              <input
                type="file"
                accept="image/*"
                capture="environment"
                id="capture"
                ::change=${handleCaptureImage}
              />
            </label>
          </div>
        </div>
        
      </section>

      <section class="task-details--description">
        <!-- TODO: use debounce  TODO: bound event handlers properly  -->
        <input
          id="task-description-edit"
          class="description-edit"
          value="${task?.description ?? ""}"
          placeholder="Task description"
          autocomplete="off"
          ::input=${handleEditTaskDescription}
        />
        <div id="subtasks-list">
          ${task.subtasks?.map(subtaskItem)}
        </div>
        <div style="padding: 4px 8px; ">
          <button 
            class="${ACTION_BUTTON} ${SMALL_BUTTON}"
            ::click=${handleAddSubtask}
          >
            ⊞
          </button>
        </div>
      </section>
    </div>
    ${taskDetailsStyle()}
  `;
};
