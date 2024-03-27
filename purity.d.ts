type Allowed = string | number;
type Rejected = undefined | null | false;
type Simple = Allowed | Rejected;
type Argument = Simple | string[];
export type Rerender = () => void;
export type App<State> = {
    mount: (f: () => string) => void;
    rerender: Rerender;
    getState: () => State;
    setState(callback: (state: State) => Partial<State>): void;
};
type Target = HTMLElement & HTMLInputElement & HTMLFormElement;
type DomEvent = (Event & MouseEvent) & {
    target: Target;
    currentTarget: Target;
};
export type EventHandler = (e: DomEvent) => void | Promise<void>;
/**
 * App factory that should be invoked once to create an application state
 */
export declare const init: <State extends Record<string, unknown>>(initialState: State) => App<State>;
export declare const isTruthy: <T>(x: Rejected | T) => x is T;
/**
 * Tagged template to compute the html string from a string literal
 */
export declare const render: ([first, ...strings]: TemplateStringsArray, ...args: Array<Argument | EventHandler>) => string;
export {};
