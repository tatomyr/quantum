import { render, debounce } from "../../../index.js";
import { setState } from "../app.js";
import { fakeEndpoint } from "../helpers.js";
import { suggestionsList } from "./suggestions-list.js";
import { errorBanner } from "./error-banner.js";
import { spinner } from "./spinner_.js";
import { chosenItems } from "./chosen-items.js";
const handleInput = debounce(async (e) => {
    const query = e.target.value;
    if (query) {
        setState(() => ({ isLoading: true }));
        try {
            const items = await fakeEndpoint(query);
            setState(() => ({ items }));
        }
        catch (err) {
            setState(() => ({ error: err.message }));
        }
        finally {
            setState(() => ({ isLoading: false }));
        }
    }
}, 500);
export const root = () => render `
  <div id="root">
    ${chosenItems()}
    <input
      placeholder="Search query"
      ::input=${handleInput}
    />
    ${spinner()}
    ${suggestionsList()}
    ${errorBanner()}
  </div>
`;
