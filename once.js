export const makeOnce = () => {
    const calls = new Set();
    return (id, query) => {
        if (!calls.has(id)) {
            calls.add(id);
            setTimeout(query);
        }
    };
};
