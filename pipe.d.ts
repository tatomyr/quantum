type Fn = (x: any) => any;
export type Pipe = (...funcs: Fn[]) => Fn;
export declare const pipe: Pipe;
export {};
