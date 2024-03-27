import { makeDrag, render } from "../../index.js";
import { setState } from "../index.js";
import { put } from "../services/storage.js";
import { editor, getEditor } from "./editor.js";
import { playgroundStyle } from "./playground-style.js";
import { view } from "./view.js";
const initDrag = makeDrag(e => {
    const startWidth = window.getComputedStyle(getEditor()).width;
    const fullWidth = window.getComputedStyle(document.getElementById("playground-root")).width;
    console.log("drag:init", startWidth, "/", fullWidth);
    setState(() => ({ placeOverDisplay: "initial" }));
    return ({ left }) => {
        const width = (100 * (parseInt(startWidth, 10) + parseInt(left, 10))) /
            parseInt(fullWidth, 10) +
            "%";
        getEditor().style.width = width;
        console.log("drag:move", { left });
        return () => {
            console.log("drag:stop", width);
            put({ editorWidth: width });
            setState(() => ({ placeOverDisplay: "none" }));
        };
    };
});
export const playground = () => render `
  <div id="playground-root" class="playground">
    ${editor()}
    <div class="resizer" >
      <div class="handler" ::mousedown=${initDrag}></div>
    </div>
    <div id="playground-view">
      <iframe id="playground-iframe" srcdoc="${view()}"></iframe>
      <div id="place-over"></div>
    </div>
    ${playgroundStyle()}
  </div>
`;
