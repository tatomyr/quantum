import { render } from "../../../index.js";
import { openSettings } from "../services/settings.js";
import { navItem } from "./nav-item.js";
import { ACTION_BUTTON } from "./app-style.js";
const headerStyle = () => render `
  <style id="header-style">
    #header {
      background-color: lightgrey;
      height: 3rem;
      min-height: 3rem;
      max-width: 100%;
      z-index: 1;
    }

    #header ul {
      display: flex;
      justify-content: space-around;
      user-select: none;
    }

  </style>
`;
export const header = () => render `
  <nav id="header">
    <ul>
      ${navItem({ value: "active", label: "⊡" })}
      ${navItem({ value: "completed", label: "⊠" })}
      <li>
        <button
          class="${ACTION_BUTTON}"
          ::click=${openSettings}
        >
          ⋮
        </button>
      </li>
    </ul>
  </nav>
  ${headerStyle()}
`;
