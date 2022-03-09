import React from "react";

export interface SubscribedCache {
    [event: `update-${string}`]: boolean | undefined;
}

export const createProxyHandler = <TState extends object>(
    subscribedCache: React.MutableRefObject<SubscribedCache>,
    rerender: () => void,
    baseKey = ""
) => {
    return {
        get: (obj: TState, key: keyof TState, root: Object, keys: (keyof TState)[]) => {
            const path = `${baseKey ? `${baseKey}.` : ""}${keys.join(".")}${
                keys.length > 0 ? `.${key}` : key
            }`;
            const event: `update-${string}` = `update-${path}`;

            if (subscribedCache.current[event] === undefined) {
                const parentEventToRemove: `update-${string}` = `update-${keys.join(".")}`;

                subscribedCache.current[event] = true;

                if (subscribedCache.current[parentEventToRemove] === true) {
                    subscribedCache.current[parentEventToRemove] = false;
                }

                rerender();
            }

            return obj[key];
        },
    };
};
