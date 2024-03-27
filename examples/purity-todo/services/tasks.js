import { md5, sanitize } from "../../../index.js";
import { setState, state } from "../app.js";
import { IMAGES } from "../config/images.js";
import { put } from "./storage.js";
const makeId = (description) => md5(description.trim().toLowerCase());
export const prepareTask = (description) => {
    const id = makeId(description);
    const now = Date.now();
    const task = {
        description,
        id,
        completed: false,
        createdAt: now,
        updatedAt: now,
        image: {
            link: IMAGES.LOADING,
            queries: {},
        },
    };
    return task;
};
export const patchTask = (patch) => {
    const now = Date.now();
    setState(({ tasks }) => ({
        tasks: tasks.map(({ isImageLoading, ...task }) => task.id === patch.id
            ? { ...task, ...patch, updatedAt: now, tmpFlag: true }
            : task),
    }));
    put({ tasks: groomTasks(state.tasks) });
};
export const deleteTask = (id) => {
    setState(({ tasks }) => ({ tasks: tasks.filter(task => task.id !== id) }));
    put({ tasks: groomTasks(state.tasks) });
};
export const byInput = ({ input }) => ({ description }) => description
    .trim()
    .toLowerCase()
    .indexOf(sanitize(input).trim().toLocaleLowerCase()) !== -1;
export const byStatus = ({ view, input }) => ({ completed, tmpFlag }) => !!(input ||
    tmpFlag ||
    (view === "active" && !completed) ||
    (view === "completed" && completed));
const toBaseTask = ({ tmpFlag, ...task }) => task;
export const groomTasks = (tasks) => tasks.map(toBaseTask).sort((a, b) => b.updatedAt - a.updatedAt);
