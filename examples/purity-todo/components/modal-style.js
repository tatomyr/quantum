import { render } from "../../../index.js";
export const modalStyle = () => render `
  <style>
    .modal-wrapper {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: #50505030;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal-wrapper .modal-content {
      max-width: 90vw;
      max-height: 90vh;
      width: 90vh;

      overflow-y: auto;
      background-color: white;
    }

    .modal {
      border: 1px solid wheat;
      box-shadow: 0px 4px 16px 0px;
    }

    .modal .modal-header {
      background-color: lightgrey;
      font-weight: bold;
      position: relative;
      ${lineContainerCSS}
    }

    .modal .modal-header p {
      ${lineTextCSS}
    }

  </style>
`;
export const lineContainerCSS = `
  display: flex;
  height: 3rem;
  min-height: 3rem;
  align-items: center;
  padding: 0;
`;
export const lineTextCSS = `
  flex-grow: 1;
  padding: 2px 8px;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;
