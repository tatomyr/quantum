import { render } from "../../index.js";
import { get } from "../services/storage.js";
export const editorStyle = () => render `
  <style id="playground-editor-style"> 
    #editor {
      width: ${get({ editorWidth: "50%" }).editorWidth};
      min-width: 10vw;
      max-width: 90vw;
      height: 100%;
      overflow-y: hidden;
    }
  </style>
`;
