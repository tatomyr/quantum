import { init } from "../../purity.js";
export const { mount, rerender, getState, setState } = init({
    items: [],
    input: "",
    spinner: false,
});
