import React from "react";
import { EventKey } from "./context-control-types";
export interface SubscribedCache {
    [event: EventKey]: boolean | undefined;
}

export const createProxyHandler = <TState extends object>(
    subscriptionRef: React.MutableRefObject<SubscribedCache>,
    rerender: Function,
    baseKey = ""
) => {
    return {
        get: (obj: TState, key: keyof TState, root: Object, keys: (keyof TState)[]) => {
            const parentPath = `${baseKey ? `${baseKey}.` : ""}${keys.join(".")}`;
            const path = `${parentPath}${keys.length > 0 ? `.${key}` : key}`;
            const event: EventKey = `update-${path}`;

            if (subscriptionRef.current[event] === undefined) {
                const parentEventToRemove: EventKey = `update-${parentPath}`;

                subscriptionRef.current[event] = true;

                if (subscriptionRef.current[parentEventToRemove] === true) {
                    subscriptionRef.current[parentEventToRemove] = false;
                }

                rerender();
            }

            return obj[key];
        },
    };
};
