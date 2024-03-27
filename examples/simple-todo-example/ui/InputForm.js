import { render } from "../../../index.js";
import { generateNextId } from "../helpers.js";
import { setState } from "../app.js";
export const InputForm = () => render `
  <form
    id="input-form"
    ::submit=${e => {
    e.preventDefault();
    setState(({ items }) => ({
        items: [
            ...items,
            {
                text: e.target.text.value,
                checked: false,
                id: generateNextId(items),
            },
        ],
    }));
}}
  >
    <input
      name="text"
      placeholder="Enter text"
      ::input=${e => {
    setState(() => ({
        input: e.target.value,
    }));
}}
    />
    <button type="submit">Add</button>
    <button
      type="reset"
      ::click=${() => {
    setState(() => ({
        input: "",
    }));
}}
    >
      Clear
    </button>
  </form>
`;
