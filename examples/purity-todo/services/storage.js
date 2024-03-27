import { ls } from "../../../index.js";
export const { put, get } = ls("purity-todo");
const migrate = () => {
    // Migrate 2.9 -> 2.10
    // TODO: This migration filed miserably. Some records were lost, some were duplicated. I suppose this is due to partial caching. Try understanding why.
    if (!localStorage["purity-todo"] && localStorage.tasks) {
        console.warn("Migrating to v2.10");
        const retrieveJSON = (obj) => {
            const [[key, defaultValue]] = Object.entries(obj);
            try {
                return (JSON.parse(window.localStorage.getItem(key)) || defaultValue);
            }
            catch (err) {
                return defaultValue;
            }
        };
        console.warn("Previous:", localStorage.tasks);
        const tasks = retrieveJSON({ tasks: [] });
        put({ tasks });
        localStorage.removeItem("tasks");
    }
};
migrate();
