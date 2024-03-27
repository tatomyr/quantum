import { render, init } from "../../index.js";
export const { mount, getState, setState } = init({
    count: 0,
});
const increment = () => setState(({ count }) => ({ count: count + 1 }));
const decrement = () => setState(({ count }) => ({ count: count - 1 }));
const reset = () => setState(() => ({ count: 0 }));
export const root = () => render `
  <div id="root">
    <h1>Counter</h1>
    <div id="count">${getState().count}</div>
    <button id="inc" ::click=${increment}>⊕</button>
    <button id="dec" ::click=${decrement}>⊖</button>
    <button id="reset" ::click=${reset}>
      ⊗
    </button>
  </div>
`;
