import { render } from "../../../purity.js";
import { setState } from "../app.js";
import { addItem, getItems } from "../api.js";
export const InputForm = () => render `
  <form
    id="input-form"
    ::submit=${async (e) => {
    e.preventDefault();
    setState(() => ({ spinner: true }));
    const text = e.target.text.value;
    try {
        const justAddedItem = await addItem(text);
        const items = await getItems();
        setState(() => ({
            items: items.map(item => item.id === justAddedItem.id ? { ...item, justAdded: true } : item),
        }));
    }
    catch (err) {
        window.alert(err.message);
    }
    finally {
        setState(() => ({
            spinner: false,
        }));
    }
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
