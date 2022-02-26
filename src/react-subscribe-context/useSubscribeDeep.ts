import deepProxy from "deep-proxy-polyfill";
import { Context, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { ControlState } from "./subscriber-types";

interface StateSetter<TState> {
    (value: Partial<TState>): void;
    (getState: (state: TState) => Partial<TState>): void;
}

type UseSubscribeReturn<TState> = [TState, StateSetter<TState>];

interface SubscribedCache {
    [event: `update-${string}`]: boolean | undefined;
}

const createProxyHandler = <TState extends object>(
    subscribedCache: React.MutableRefObject<SubscribedCache>,
    rerender: () => void
) => {
    return {
        get: (obj: TState, key: keyof TState, root: Object, keys: (keyof TState)[]) => {
            const path = `${keys.join(".")}${keys.length > 0 ? `.${key}` : key}`;
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

export const useSubscribeDeep = <TState extends object>(
    Context: Context<ControlState<TState>>
): UseSubscribeReturn<TState> => {
    const { emitter, setState, getState } = useContext(Context);
    const [, updateState] = useState({});
    const rerender = useCallback(() => updateState({}), []);
    const subscribedCache = useRef<SubscribedCache>({});
    const state = getState();

    const proxyHandler = useMemo(
        () => createProxyHandler<TState>(subscribedCache, rerender),
        [rerender]
    );

    // How can I cache this? Is it even expensive to worry about caching?
    const proxyState = deepProxy(state, proxyHandler);

    useEffect(() => {
        const handleEvent = () => {
            rerender();
        };

        const events = (Object.keys(subscribedCache.current) as `update-${string}`[]).filter(
            (path) => subscribedCache.current[path]
        );

        events.forEach((event) => {
            emitter.on(event, handleEvent);
            // console.log("mount emitter for", event);
        });

        return () => {
            events.forEach((event) => {
                emitter.off(event, handleEvent);
                // console.log("unmounting emitter for", event);
            });
        };
    }, [rerender, emitter, subscribedCache]);

    const stateSetter: StateSetter<TState> = (values) => {
        if (values instanceof Function) {
            return setState(values(getState()));
        }
        setState(values);
    };

    // console.log({ subscribedEvents });

    return [proxyState, stateSetter];
};
