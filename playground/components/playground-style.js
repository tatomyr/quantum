import { render } from "../../index.js";
import { getState } from "../index.js";
export const playgroundStyle = () => render `
  <style id="playground-style"> 
    .playground {
      display: flex;
      flex-direction: row;
      height: 100vh;
    }

    .resizer {
      width: 8px;
      min-width: 8px;
      background-color: #80008026;
      border-left: 2px dashed purple;
      position: relative;
      user-select: none;
      -webkit-user-select: none;
    }

    .resizer:hover {
      background-color: cyan;
    }

    .resizer .handler {
      position: absolute;
      width: 8px;
      min-width: 8px;
      height: 24px;
      top: calc(50% - 24px / 2);
      background-color: purple;
      cursor: col-resize;
      border-radius: 0 4px 4px 0;
      left: -2px;
    }

    #playground-view {
      overflow-y: auto;
      flex-grow: 1;
      position: relative;
      user-select: none;
      -webkit-user-select: none;
    }

    #playground-view > iframe {
      width: 100%;
      height: 100%;
      border: none;
      user-select: none;
      -webkit-user-select: none;
    }

    #playground-view > #place-over {
      display: ${getState().placeOverDisplay};
      opacity: 0.25;
      background: white;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      user-select: none;
      -webkit-user-select: none;
    }

    #error {
      position: absolute;
      right: 10px;
      bottom: 10px;
      left: 10px;
      padding: 8px;
      max-height: calc(100% - 20px);
      overflow-y: auto;
      color: red;
      background: black;
    }
  </style>
`;
