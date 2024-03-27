export const delay = (t = 0) => ({
    then: (resolve) => {
        const timeout = setTimeout(() => resolve(timeout), t);
    },
});
