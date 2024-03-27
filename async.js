// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const makeAsync = (rerender) => {
    const caches = {};
    const _getOrCreateCache = (key) => {
        if (!(key in caches)) {
            console.warn(`Creating cache for [${key}] for the first time`);
            caches[key] = { status: "initial", expires: 0 };
        }
        else {
            console.warn(`Cache for [${key}] exists:`, caches[key]);
        }
        return caches[key];
    };
    return {
        useAsync: (key, query, { expiration = 3600000 } = {}) => {
            const cache = _getOrCreateCache(key);
            const fire = async ({ optimisticData, _shouldRefetch, mutation, } = {}) => {
                console.warn("🔥");
                if (cache.status === "pending") {
                    console.warn("❗ Skipped 🔥 due to race condition.");
                    return;
                }
                try {
                    if (optimisticData !== undefined) {
                        cache.data = optimisticData;
                    }
                    cache.status = "pending";
                    if (!_shouldRefetch) {
                        // TODO: investigate why does it fail without the IF?
                        rerender();
                    }
                    if (mutation) {
                        await mutation(cache);
                    }
                    cache.data = await query(optimisticData);
                    cache.status = "success";
                    cache.error = undefined;
                    cache.expires = Date.now() + expiration;
                }
                catch (err) {
                    console.error(`HERE IS THE ERROR:`, err);
                    cache.status = "error";
                    cache.error = err;
                    cache.expires = Date.now() + expiration;
                }
                finally {
                    rerender();
                }
            };
            const unwrap = () => {
                if (cache.status === "success" && Date.now() < cache.expires) {
                    return cache.data;
                }
                else {
                    return query();
                }
            };
            const getCached = () => cache;
            const call = optimisticData => {
                const _shouldRefetch = cache.status === "initial" || Date.now() >= cache.expires;
                if (_shouldRefetch) {
                    console.warn(`Executing the query for a newly created or expired cache`);
                    fire({ optimisticData, _shouldRefetch });
                }
                return { fire, unwrap, getCached, ...cache };
            };
            return { call, fire, unwrap, getCached };
        },
    };
};
