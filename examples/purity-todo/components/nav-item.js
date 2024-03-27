import { render } from "../../../index.js";
import { setState, state } from "../app.js";
import { byInput, byStatus, groomTasks } from "../services/tasks.js";
import { ACTION_BUTTON } from "./app-style.js";
const isChosen = (value, tasks) => !!tasks
    ?.filter(byInput(state))
    .filter(byStatus(state))
    .some(({ completed }) => (value === "active" && !completed) ||
    (value === "completed" && completed));
export const navItem = ({ value, label }) => render `
  <li id="${value}">
    <button
      class="${ACTION_BUTTON} ${isChosen(value, state.tasks) && "chosen"}"
      ::click=${() => {
    setState(({ tasks }) => ({ view: value, tasks: groomTasks(tasks) }));
}}
    >
      ${label}
    </button>
  </li>
`;
