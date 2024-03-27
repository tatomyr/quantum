import { render } from "../../index.js";
import { StatefulCounter } from "./StatefulCounter.js";
export const Root = () => render `
    <div id="root">
      <h1 id="title">Counters</h1>
      ${StatefulCounter({ id: "counter" })}
      ${StatefulCounter({ id: "counter-1" })}
    </div>
  `;
