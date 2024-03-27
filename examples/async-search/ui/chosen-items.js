import { render } from "../../../purity.js";
import { getState, setState } from "../app.js";
import { idIsNotEqual } from "../helpers.js";
const item = ({ name, id }) => render `
  <li
    ::click=${() => {
    setState(({ chosenItems }) => ({
        chosenItems: chosenItems.filter(idIsNotEqual(id)),
    }));
}}
  >
    ${name}
  </li>
`;
export const chosenItems = () => render `
  <ul id="chosen-items" class="chosen-items">
    ${getState().chosenItems.map(item)}
  </ul>
`;
