import { setState, state } from "../app.js";
import { handleError } from "./error.js";
import { put } from "./storage.js";
import { groomTasks } from "./tasks.js";
import { download, textFileReader } from "./text-file-manager.js";
export const downloadUserData = async () => {
    try {
        const fileName = `TODO-${new Date()
            .toISOString()
            .replaceAll(/[:.]/g, "_")}.backup.json`;
        download(fileName, JSON.stringify(groomTasks(state.tasks)));
        closeSettings();
    }
    catch (err) {
        handleError(err);
    }
};
export const uploadUserData = async ({ target: { files } }) => {
    const [file] = files;
    try {
        const text = await textFileReader(file);
        const tasks = JSON.parse(text);
        if (window.confirm(`Are you sure you want to replace current todo list in your storage (${state.tasks.length} items) with new one (${tasks.length} items)?`)) {
            setState(() => ({ tasks }));
            put({ tasks });
            closeSettings();
        }
    }
    catch (err) {
        handleError(err);
    }
};
export const closeSettings = () => setState(() => ({ isSettingsModalOpen: false }));
export const openSettings = () => setState(() => ({ isSettingsModalOpen: true }));
