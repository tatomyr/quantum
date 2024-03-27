import { render, init, Switch, push, registerRouter } from "../../index.js";
export const { mount, rerender } = init({});
registerRouter(rerender);
export const root = () => render `
  <div id="root">
    ${Switch({
    "#/alternative": () => render `
        <div>Alternative view</div>
        <button ::click=${() => push("#/")}>
          ← Back to default
        </button>
      `,
    "#/": () => render `
        <div>Default view</div>
        <a href="#/alternative">
          Go to alvernative →
        </a>
      `,
})}
  </div>
`;
