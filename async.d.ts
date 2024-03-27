import type { Rerender } from "./purity.js";
export type QueryStatus = "initial" | "pending" | "success" | "error";
export type QueryCache<T> = {
    status: QueryStatus;
    data?: T;
    error?: Error;
    expires: number;
};
export type Fire<T> = (options?: {
    optimisticData?: T;
    _shouldRefetch?: boolean;
    mutation?: (cache: QueryCache<T>) => Promise<void>;
}) => Promise<void>;
export type Unwrap<T> = () => T | Promise<T>;
export type QueryMethods<T> = {
    fire: Fire<T>;
    unwrap: Unwrap<T>;
    getCached: () => QueryCache<T>;
};
export type Call<T> = (optimisticData?: T) => QueryCache<T> & QueryMethods<T>;
export type Query<T> = (optimisticData?: T) => Promise<T>;
export declare const makeAsync: (rerender: Rerender) => {
    useAsync: <T>(key: string, query: Query<T>, { expiration }?: {
        expiration?: number | undefined;
    }) => QueryMethods<T> & {
        call: Call<T>;
    };
};
