import { render } from "../../../purity.js";
import { setState } from "../app.js";
import { deleteItem, getItems, toggleItem } from "../api.js";
export const ListItem = ({ id, text, checked, justAdded, }) => render `
  <li
    id="${id}"
    class="${checked ? "checked" : ""} ${justAdded ? "highlighted" : ""}"
    title="${id}"
  >
    <input
      type="checkbox"
      ${checked ? "checked" : ""}
      ::change=${async (e) => {
    const { checked } = e.target;
    setState(() => ({ spinner: true }));
    try {
        const toggledItem = await toggleItem(id, checked);
        setState(({ items }) => ({
            items: items.map(item => (item.id === id ? toggledItem : item)),
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
    />
    <span>${text}</span>
    <button
      type="button"
      ::click=${async () => {
    setState(() => ({ spinner: true }));
    try {
        await deleteItem(id);
        const items = await getItems();
        setState(() => ({ items }));
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
      x
    </button>
  </li>
`;
