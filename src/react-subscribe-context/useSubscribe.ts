import deepProxy from "deep-proxy-polyfill";
import { Context, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createProxyHandler, SubscribedCache } from "react-subscribe-context/createProxyHandler";
import { getUpdateEventName } from "utils/getUpdateEventName";
import { ContextControl, EventKey } from "./context-control-types";

const getSubscribedEvents = (subscribedCache: SubscribedCache) => {
    return (Object.keys(subscribedCache) as EventKey[]).filter((path) => subscribedCache[path]);
};

interface UpdateValue<TState, TKey extends keyof TState & string> {
    (nextValue: TState[TKey]): void;
    (getNextValue: (value: TState[TKey], state: TState) => TState[TKey]): void;
}

export type UseSubscribeValueReturn<
    TState,
    TKey extends keyof TState & string,
    TActions extends object
> = [TState[TKey], UpdateValue<TState, TKey>, ContextControl<TState, TActions>] & {
    value: TState[TKey];
    setValue: UpdateValue<TState, TKey>;
    contextControl: ContextControl<TState, TActions>;
};

export type UseSubscribeStateReturn<TState, TActions extends object> = [
    TState,
    ContextControl<TState, TActions>["setState"],
    ContextControl<TState, TActions>
] & {
    state: TState;
    setState: ContextControl<TState, TActions>["setState"];
    contextControl: ContextControl<TState, TActions>;
};

export function useSubscribe<TState, TKey extends keyof TState & string, TActions extends object>(
    Context: Context<ContextControl<TState, TActions>>,
    key: TKey
): UseSubscribeValueReturn<TState, TKey, TActions>;

export function useSubscribe<TState, TActions extends object>(
    Context: Context<ContextControl<TState, TActions>>,
    key?: undefined | null
): UseSubscribeStateReturn<TState, TActions>;

export function useSubscribe<
    TState extends object,
    TKey extends keyof TState & string,
    TActions extends object
>(
    Context: Context<ContextControl<TState, TActions>>,
    key: TKey | undefined | null
): UseSubscribeValueReturn<TState, TKey, TActions> | UseSubscribeStateReturn<TState, TActions> {
    const contextControl = useContext(Context);
    const { emitter, getState, getValue, setValue, setState } = contextControl;
    const [, setFakeValue] = useState({});
    const rerender = useCallback(() => setFakeValue({}), []);
    const subscribedCacheRef = useRef<SubscribedCache>({});
    const numEvents = Object.keys(subscribedCacheRef.current).length;

    const stateProxyHandler = useMemo(
        () => createProxyHandler<any>(subscribedCacheRef, rerender),
        [rerender]
    );

    const valueProxyHandler = useMemo(
        () => createProxyHandler<any>(subscribedCacheRef, rerender, key as string),
        [rerender, key]
    );

    useEffect(() => {
        if (key) {
            const value = getValue(key);

            if (typeof value !== "object" || Array.isArray(value)) {
                subscribedCacheRef.current[getUpdateEventName(key)] = true;
            }
        }

        const events = getSubscribedEvents(subscribedCacheRef.current);

        events.forEach((event) => {
            emitter.on(event, rerender);
        });

        return () => {
            events.forEach((event) => {
                emitter.off(event, rerender);
            });
        };
    }, [emitter, rerender, key, getValue, numEvents]);

    if (key) {
        const value = getValue(key);
        let result: any[] & any = [getValue(key)];

        if (typeof value === "object" && !Array.isArray(value)) {
            result = [deepProxy(value, valueProxyHandler)];
        }

        const updateValue: UpdateValue<TState, TKey> = (value) => {
            if (value instanceof Function) {
                setValue(key, value);
            } else {
                setValue(key, value);
            }
        };

        result.push(updateValue, contextControl);

        result.value = result[0];
        result.setValue = updateValue;
        result.contextControl = contextControl;

        return result as UseSubscribeValueReturn<TState, TKey, TActions>;
    }

    const result: any = [deepProxy(getState(), stateProxyHandler), setState, contextControl];

    result.state = result[0];
    result.setState = setState;
    result.contextControl = contextControl;

    return result as UseSubscribeStateReturn<TState, TActions>;
}
