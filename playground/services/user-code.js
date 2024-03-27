import { debounce, LZString, push } from "../../index.js";
import { codeSample } from "./code-sample.js";
console.log(document.location.hash);
export const defaultCode = LZString.decompressFromEncodedURIComponent(document.location.hash.slice(1)) ||
    codeSample;
export const createUpdate = updateCode => debounce((text) => {
    updateCode(text);
    push(LZString.compressToEncodedURIComponent(text));
}, 1000);
