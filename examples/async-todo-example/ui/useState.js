import { rerender } from "../app.js";
export function useState(state) {
    return (changes) => {
        Object.assign(state, changes);
        rerender();
    };
}
