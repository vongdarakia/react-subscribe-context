import React from 'react';
import { EventKey } from './context-control-types';

export interface SubscribedCache {
    [event: EventKey]: boolean | undefined;
}

/**
 * Creates a proxy handler to intercept an object so that it can store information on what fields were accessed. It's used to know what fields to subscribe to.
 *
 * @param subscriptionRef A reference to where to store what fields where subscribed to
 * @param rerender A function to rerender useSubscribe so that it can subscribed to the accessed field
 * @param baseKey A prefix of the event key name. Used in situations where you want to use the name of the variable as the prefix so that it matches with the state updates.
 *
 * Ex. Proxy of `const user = { name: { first: "" } } will have event keys like name.first. With a baseKey of 'user', you'll get back user.name.first.
 * @returns Proxy handler
 */
export const createProxyHandler = <TState extends object>(
    subscriptionRef: React.MutableRefObject<SubscribedCache>,
    rerender: () => void,
    baseKey = ''
) => {
    return {
        get: (obj: TState, key: keyof TState, root: object, keys: (keyof TState)[]) => {
            const parentPath = `${baseKey ? `${baseKey}.` : ''}${keys.join('.')}`;
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
