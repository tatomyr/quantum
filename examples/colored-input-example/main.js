import { init, render } from "../../index.js";
export const { mount, getState, setState } = init({
    color: "black",
});
const handleInput = e => {
    setState(() => ({ color: e.target.value }));
};
export const root = () => render `
  <div id="root">
    <input
      id="color"
      style="color: ${getState().color};"
      ::input=${handleInput}
    />
  </div>
`;
