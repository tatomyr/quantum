import { setState } from "../app.js";
export const resetInput = () => {
    const $form = document.getElementById("task-form");
    $form.reset();
    $form.task.blur();
    setState(() => ({ input: "" }));
};
