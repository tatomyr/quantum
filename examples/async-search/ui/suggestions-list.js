import { isTruthy, render } from "../../../purity.js";
import { idEquals } from "../helpers.js";
import { getState, setState } from "../app.js";
const item = ({ name, id }) => render `
  <li
    ::click=${() => {
    setState(({ items, chosenItems }) => ({
        chosenItems: [
            ...chosenItems,
            !chosenItems.some(idEquals(id)) && items.find(idEquals(id)),
        ].filter(isTruthy),
    }));
}}
  >
    ${name}
  </li>
`;
export const suggestionsList = () => render `
  <ul id="list">
    ${getState().items.map(item)}
  </ul>
`;
