export type VisibilityCallback = (visibilityState: boolean | null) => void;
export declare const trackVisibility: (elem: HTMLElement, callback: VisibilityCallback) => void;
export declare const isInViewport: (elem: HTMLElement) => boolean | null;
