export const ls = (key) => {
    const get = (defaultData = {}) => {
        try {
            const dataFromStorage = JSON.parse(localStorage.getItem(key)) || {};
            return { ...defaultData, ...dataFromStorage };
        }
        catch (err) {
            return defaultData;
        }
    };
    const put = async (data) => {
        localStorage.setItem(key, JSON.stringify({ ...get(), ...data }));
    };
    const drop = () => {
        localStorage.removeItem(key);
    };
    return {
        get,
        put,
        drop,
    };
};
