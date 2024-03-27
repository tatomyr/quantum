type InitCallback = (e: MouseEvent) => MoveCallback;
type MoveCallback = (coordinates: {
    left: string;
    top: string;
    startLeft: string;
    startTop: string;
}) => StopCallback;
type StopCallback = (() => void) | void;
type MouseEventHandler = (e: MouseEvent) => void;
export declare const makeDrag: (onInit: InitCallback) => MouseEventHandler;
export {};
