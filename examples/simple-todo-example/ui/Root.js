import { render } from "../../../index.js";
import { getState } from "../app.js";
import { ListItem } from "./ListItem.js";
import { InputForm } from "./InputForm.js";
export const Root = () => {
    const { items, input } = getState();
    return render `
    <div id="root">
      <h1 id="title">The List (${items.length})</h1>
      <ol id="list">
        ${items.filter(({ text }) => text.indexOf(input) !== -1).map(ListItem)}
      </ol>
      ${InputForm()}
    </div>
  `;
};
