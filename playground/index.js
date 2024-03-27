import { init, makeOnce } from "../index.js";
import { playground } from "./components/playground.js";
// Suppressing the main output (iframe output remains):
console.log = () => null;
console.warn = () => null;
export const { mount, getState, setState, rerender } = init({
    code: "",
    placeOverDisplay: "none",
});
export const once = makeOnce();
mount(playground);
