import { render, sanitize } from "../../../index.js";
import { setState, state } from "../app.js";
import { IMAGES } from "../config/images.js";
import { handleError } from "../services/error.js";
import { fetchAndNormalizeImages } from "../services/images.js";
import { resetInput } from "../services/input-form.js";
import { patchTask, prepareTask } from "../services/tasks.js";
const inputFormStyle = () => render `
  <style id="task-form-style">
    form#task-form {
      width: 100%;
      max-width: 100%;
      height: 3rem;
      min-height: 3rem;
    }

    form#task-form input {
      width: 100%;
      height: 100%;
      background-color: #303030;
      color: #eee;
      border-radius: 0;
    }

  </style>
`;
const createTask = async (e) => {
    e.preventDefault();
    const description = sanitize(e.target.task.value);
    const task = prepareTask(description);
    if (state.tasks.some(({ id }) => id === task.id)) {
        window.alert("There is already a task with the same id in the list");
        return;
    }
    resetInput();
    setState(({ tasks }) => ({
        view: "active",
        tasks: [{ ...task, isImageLoading: true }, ...tasks],
    }));
    try {
        const image = await fetchAndNormalizeImages(task);
        patchTask({ ...task, image });
    }
    catch (err) {
        handleError(err);
        patchTask({
            ...task,
            image: { link: IMAGES.UNDEFINED_TASK, queries: {} },
        });
    }
};
export const inputForm = () => render `
  <form id="task-form" ::submit=${createTask}>
    <input
      name="task"
      ::input=${e => {
    setState(() => ({ input: e.target.value }));
}}
      value=""
      placeholder="Task description"
      autocomplete="off"
    />
  </form>
  ${inputFormStyle()}
`;
