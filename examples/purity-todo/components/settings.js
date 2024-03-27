import { render } from "../../../index.js";
import { downloadUserData, uploadUserData } from "../services/settings.js";
import { lineContainerCSS, lineTextCSS } from "./modal-style.js";
import { ACTION_BUTTON } from "./app-style.js";
import { version } from "./version.js";
const settingsStyle = () => render `
  <style>
    ul.settings li {
      border-bottom: 1px solid lightgrey;
      ${lineContainerCSS}
    }

    ul.settings li p {
      ${lineTextCSS}
    }

    ul.settings li #version {
      width: auto;
      font-size: 1.5rem;
      line-height: 2;
    }

  </style>
`;
export const settings = () => render `
  <ul class="settings">
    <li>
      <p>Backup</p>
      <button ::click=${downloadUserData} class="${ACTION_BUTTON}">
        ↧
      </button>
    </li>
    <li>
      <p>Restore</p>
      <label for="restore-backup" class="${ACTION_BUTTON}">
        ↥
        <input
          type="file"
          accept=".json"
          id="restore-backup"
          ::change=${uploadUserData}
        />
      </label>
    </li>
    <li>
      ${version()}
    </li>
  </ul>
  ${settingsStyle()}
`;
