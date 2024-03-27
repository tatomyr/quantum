/**
 * Debounce
 *
 * @param {callback} callback function to be executed
 * @param {number} wait interval between calls
 *         positive for triggering the callback on the trailing edge
 *         negative for triggering the callback on the leading edge
 */
export const debounce = (callback, wait = 100) => {
    let timeout;
    return (...args) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        else if (wait < 0) {
            callback(...args);
        }
        timeout = setTimeout(() => {
            if (wait > 0)
                callback(...args);
            timeout = undefined;
        }, Math.abs(wait));
    };
};
