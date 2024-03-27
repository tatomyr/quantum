import { render } from "../../../index.js";
import { getState, setState } from "../app.js";
export const errorBanner = () => {
    const { error } = getState();
    return render `
    <div id="error-banner">
      ${error &&
        render `
          <pre
            class="error-banner"
            ::click=${() => {
            setState(() => ({ error: "" }));
        }}
          >
            ${error}
          </pre>
        `}
    </div>
  `;
};
