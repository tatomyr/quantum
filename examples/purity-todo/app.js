import { init, makeAsync } from "../../index.js";
import { makeIntrospector } from "../../introspector.js";
import { get } from "./services/storage.js";
export const initialState = {
    view: "active",
    input: "",
    isSettingsModalOpen: false,
    tasks: get({ tasks: [] }).tasks,
    taskListElement: null,
};
export const state = { ...initialState };
export const { mount, setState, rerender } = init(state);
export const { useAsync } = makeAsync(rerender);
// Fixes the issue with the keyboard on mobile devices.
window.visualViewport?.addEventListener("resize", () => {
    const height = window.visualViewport?.height;
    document.body.style.height = document.body.style.maxHeight = height + "px";
    document.body.scrollIntoView();
});
export const theIntrospector = makeIntrospector(rerender, new URLSearchParams(location.search).has("introspect"));
