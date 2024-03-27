import { init, render } from "../../purity.js";
export const { mount, getState, setState } = init({ text: "" });
export const root = () => render `
  <div id="root">
    <input
      type="text"
      ::keyup=${e => {
    setState(() => ({ text: e.target.value }));
}}
      ::click=${() => {
    setState(() => ({ text: "" }));
}}
    />
    <div id="text">${getState().text}</div>
  </div>
`;
