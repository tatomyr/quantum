import { render } from "../../../index.js";
import { isTruthy } from "../../../purity.js";
import { state } from "../app.js";
import { ITEM_DESCRIPTION } from "./task-item.js";
const isTopScrolled = ({ taskListElement }) => taskListElement && taskListElement.scrollTop > 0;
const isBottomScrolled = ({ taskListElement }) => taskListElement &&
    taskListElement.scrollTop <
        taskListElement.scrollHeight - taskListElement.clientHeight;
export const taskListStyle = () => render `
  <style id="task-list-style">
    ol#task-list {
      overflow-y: auto;
      flex-grow: 1;
      min-height: 3rem;
      box-shadow: ${[
    isTopScrolled(state) && "inset 0px 16px 8px -16px",
    isBottomScrolled(state) && "inset 0px -16px 8px -16px",
]
    .filter(isTruthy)
    .join(",") || "none"};
    }

    ol#task-list .task-item {
      display: flex;
      border-bottom: 1px solid lightgrey;
      align-items: center;
      padding: 0;
    }

    ol#task-list .task-item .${ITEM_DESCRIPTION} {
      flex-grow: 1;
      padding: 2px 8px;
      max-height: 3rem;
      width: 100%;
      word-break: break-word;
      overflow: hidden;
    }

    ol#task-list .task-item.completed .${ITEM_DESCRIPTION} {
      color: lightgrey;
    }

    .${ITEM_DESCRIPTION} .subtask-inline {
      color: lightgrey;
    }

    .${ITEM_DESCRIPTION} .subtask-inline::before {
      content: "⊡";
      margin-right: 0.5rem;
      margin-left: 0.5rem;
      color: lightgrey;
    }

    ol#task-list .task-item > img {
      height: 3rem;
      min-height: 3rem;
      width: 3rem;
      min-width: 3rem;
      object-fit: cover;
      z-index: -1;
    }

    ol#task-list .task-item.completed > img {
      filter: grayscale(1);
    }

  </style>
`;
