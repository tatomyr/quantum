export const insertText = (element) => (text) => {
    const { selectionStart, selectionEnd } = element;
    if (selectionStart && selectionEnd) {
        element.setRangeText(text, selectionStart, selectionEnd, "end");
    }
};
