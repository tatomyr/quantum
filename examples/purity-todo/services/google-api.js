import { env } from "../env.js";
const { GOOGLE } = await import(`../config/google-api.${env}.js`);
export const makeQueryString = (query, start = 1) => `${GOOGLE.API_PATH}?${new URLSearchParams({
    q: `${query} -и`,
    searchType: "image",
    imgSize: "medium",
    num: "1",
    start: `${start}`,
    key: GOOGLE.API_KEY,
    cx: GOOGLE.CUSTOM_SEARCH_ID,
}).toString()}`;
