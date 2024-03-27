import { rerender } from "./index.js";
const state = {};
export const useState = (id) => (initial) => {
    state[id] = state[id] || initial;
    return {
        get: () => state[id],
        set: (newState) => {
            state[id] = newState;
            rerender();
        },
    };
};
