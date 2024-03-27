import { makeOnce } from "./once.js";
import { render } from "./purity.js";
const makeState = (rerender) => {
    let state;
    const get = () => state;
    const set = (callback) => {
        state = callback(state);
        rerender();
    };
    return { set, get };
};
const once = makeOnce();
export const makeIntrospector = (rerender, isVisible = false) => {
    if (!isVisible)
        return () => "";
    const theState = makeState(rerender);
    return (data) => {
        once("init-introspector", () => {
            theState.set(() => true);
        });
        const size = theState.get() ? "calc(100% - 20px)" : "30px";
        return render `
      <pre id="the-introspector" ::click=${() => {
            theState.set(s => !s);
        }}>
          ${JSON.stringify(data, null, 2)}
      </pre>
      <style id="introspector-style">
        #the-introspector {
          position: fixed;
          bottom: 10px;
          right: 10px;
          width: ${size};
          height: ${size};
          overflow: auto;
          background: rgba(0, 0, 0, 0.75);
          color: white;
          z-index: 1000;
          border: 1px solid red;
        }
      </style>
    `;
    };
};
