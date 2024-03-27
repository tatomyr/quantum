import { IMAGES } from "../config/images.js";
import { makeQueryString } from "./google-api.js";
export const fetchImages = (description, start) => fetch(makeQueryString(description, start))
    .then(res => {
    return res.json();
})
    .then(obj => {
    if (obj.error) {
        throw new Error(obj.error.message);
    }
    else {
        return obj;
    }
});
export const normalizeQuery = (queries, name) => {
    const query = queries[name];
    return query && { [name]: { startIndex: query[0].startIndex } };
};
export const fetchAndNormalizeImages = async (task, startIndex) => {
    const { items: [{ link = IMAGES.UNDEFINED_TASK }] = [{}], queries } = await fetchImages(task.description, startIndex);
    const image = {
        link,
        queries: {
            ...normalizeQuery(queries, "request"),
            ...normalizeQuery(queries, "nextPage"),
            ...normalizeQuery(queries, "previousPage"),
        },
    };
    return image;
};
