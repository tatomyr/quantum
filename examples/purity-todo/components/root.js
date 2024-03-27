import { render } from "../../../index.js";
import { state, theIntrospector } from "../app.js";
import { closeSettings } from "../services/settings.js";
import { closeTaskDetails } from "../services/task-details.js";
import { appStyle } from "./app-style.js";
import { header } from "./header.js";
import { inputForm } from "./input-form.js";
import { modal } from "./modal.js";
import { modalStyle } from "./modal-style.js";
import { settings } from "./settings.js";
import { taskDetails } from "./task-details.js";
import { taskList } from "./task-list.js";
export const root = () => render `
  <div id="root">
    ${header()}
    ${taskList()}
    ${inputForm()}
    ${appStyle()}
    <div id="settings">
      ${state.isSettingsModalOpen &&
    modal({
        title: "Settings",
        content: settings(),
        close: closeSettings,
    })}
    </div>
    <div id="task-details">
      ${state.taskDetailId &&
    modal({
        title: "Details",
        content: taskDetails(),
        close: closeTaskDetails,
    })}
    </div>
    ${modalStyle()}
    ${theIntrospector({
    task_1: state?.tasks?.[0],
    localStorage: window.localStorage,
})}
  </div>
`;
