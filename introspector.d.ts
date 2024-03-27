import type { Rerender } from "./purity.js";
export declare const makeIntrospector: (rerender: Rerender, isVisible?: boolean) => (data: Record<string, unknown>) => string;
