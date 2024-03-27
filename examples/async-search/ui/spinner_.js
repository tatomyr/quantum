import { render } from "../../../index.js";
import { getState } from "../app.js";
// FIXME: spinner. Maybe use background?
export const spinner = () => render `
  <span id="status">
    ${getState().isLoading &&
    render `
        <img
          src="./spinner.svg"
          alt="spinner"
          class="spinner"
        />
      `}
  </span>
`;
