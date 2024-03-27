import { render } from "../../../index.js";
import { useAsync } from "../app.js";
import { ACTION_BUTTON } from "./app-style.js";
const extractVersion = (name) => {
    const [version] = name?.match(/\d+.\d+/) || ["No version specified"];
    return version;
};
export const version = () => {
    const { data } = useAsync("./manifest.json", () => fetch("./manifest.json").then(res => res.json())).call();
    return render `
    <p>Version</p>
    <div id="version" class="${ACTION_BUTTON}">
      ${extractVersion(data?.name)}
    </div>
  `;
};
