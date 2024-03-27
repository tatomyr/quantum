import { render } from "../../index.js";
import { setState, once } from "../index.js";
import { configureMonacoEditor } from "../services/monaco-editor-config.js";
import { createUpdate, defaultCode } from "../services/user-code.js";
import { editorStyle } from "./editor-style.js";
export const getEditor = () => document.getElementById("editor");
export const editor = () => {
    once("configure-editor", () => {
        configureMonacoEditor({
            domElement: getEditor(),
            defaultCode,
            onChange: createUpdate((code) => setState(() => ({ code }))),
        });
    });
    return render `
    <div id="editor"></div>
    ${editorStyle()}
  `;
};
