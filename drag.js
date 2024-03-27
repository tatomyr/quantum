// Source: https://stackoverflow.com/questions/8960193/how-to-make-html-element-resizable-using-pure-javascript
export const makeDrag = (onInit) => {
    let startX, startY;
    let startLeft, startTop;
    let onMove;
    let onStop;
    const initDrag = e => {
        startX = e.clientX;
        startY = e.clientY;
        startLeft = document.defaultView.getComputedStyle(e.target).left;
        startTop = document.defaultView.getComputedStyle(e.target).top;
        document.documentElement.addEventListener("mousemove", doDrag, false);
        document.documentElement.addEventListener("mouseup", stopDrag, false);
        onMove = onInit(e);
    };
    const doDrag = e => {
        const left = e.clientX - startX + "px";
        const top = e.clientY - startY + "px";
        onStop = onMove({ left, top, startLeft, startTop });
    };
    const stopDrag = e => {
        document.documentElement.removeEventListener("mousemove", doDrag, false);
        document.documentElement.removeEventListener("mouseup", stopDrag, false);
        onStop?.();
    };
    return initDrag;
};
