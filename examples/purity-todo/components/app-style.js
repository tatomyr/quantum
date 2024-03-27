import { render } from "../../../index.js";
export const ACTION_BUTTON = "action-button";
export const appStyle = () => render `
  <style id="app-style">
    *,
    *::before,
    *::after {
      font-family: sans-serif;
      font-size: 20px;
      color: #555555;
    }

    input[type='file'] {
      display: none;
    }

    body {
      position: relative;
      height: 100vh;
    }

    ol, 
    ul {
      list-style-type: none;
      padding: 0;
    }

    #root {
      height: 100%;
      max-height: 100%;

      display: flex;
      flex-direction: column;

    }

    .${ACTION_BUTTON} {
      all: unset;
      width: 3rem;
      min-width: 3rem;
      height: 3rem;
      text-align: center;
      font-size: 2rem;
      line-height: 1;
    }

    .${ACTION_BUTTON}:active {
      background-color: grey;
      color: white;
    }

    .${ACTION_BUTTON}.hidden {
      display: none;
    }

    .${ACTION_BUTTON}.chosen {
      color: white;
    }

  </style>
`;
