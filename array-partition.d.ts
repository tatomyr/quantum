export type Predicate<T> = (x: T) => boolean;
export type PartitionTuple<T> = [T[], T[]];
export declare const partition: <T>(isValid: Predicate<T>) => (array: T[]) => PartitionTuple<T>;
