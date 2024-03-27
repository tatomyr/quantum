export declare const ls: <D extends Record<string, unknown>>(key: string) => {
    get: <P extends Partial<D>>(defaultData?: P) => D | P;
    put: <P_1 extends Partial<D>>(data: P_1) => Promise<void>;
    drop: () => void;
};
