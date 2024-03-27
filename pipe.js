export const pipe = (f, ...rest) => x => rest.length === 0 ? f(x) : pipe(...rest)(f(x));
