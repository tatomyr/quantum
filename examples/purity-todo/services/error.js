export const handleError = (err) => {
    console.error(err);
    window.alert(err?.message || err);
};
