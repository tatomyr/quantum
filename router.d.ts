type Match = Record<string, string> | undefined;
export declare const getParams: () => Match;
export declare const Switch: (routes: Record<string, (match: Match) => string>) => string | undefined;
export declare const registerRouter: (rerender: () => void) => void;
export declare const push: (hash: string) => void;
export {};
