import { setState, state } from "../app.js";
import { patchTask } from "./tasks.js";
export const closeTaskDetails = () => {
    const task = selectDetailedTask();
    patchTask({
        ...task,
        subtasks: task.subtasks?.filter(({ description }) => description),
    });
    setState(() => ({ taskDetailId: undefined }));
};
export const openTaskDetails = e => {
    const { id } = e.currentTarget.dataset;
    setState(() => ({ taskDetailId: id }));
};
export const selectDetailedTask = () => state.tasks.find(({ id }) => id === state.taskDetailId);
