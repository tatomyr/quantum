export type Callback<P extends unknown[]> = (...args: P) => void;
/**
 * Debounce
 *
 * @param {callback} callback function to be executed
 * @param {number} wait interval between calls
 *         positive for triggering the callback on the trailing edge
 *         negative for triggering the callback on the leading edge
 */
export declare const debounce: <P extends unknown[]>(callback: Callback<P>, wait?: number) => Callback<P>;
