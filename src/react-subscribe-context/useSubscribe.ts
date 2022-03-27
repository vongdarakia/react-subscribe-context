import deepProxy from "deep-proxy-polyfill";
import { Context, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createProxyHandler, SubscribedCache } from "react-subscribe-context/createProxyHandler";
import { getUpdateEventName } from "utils/getUpdateEventName";
import { ContextControl } from "./context-control-types";

interface UpdateValue<TState, TKey extends keyof TState & string> {
    (nextValue: TState[TKey]): void;
    (getNextValue: (value: TState[TKey], state: TState) => TState[TKey]): void;
}

type UseSubscribeValueReturn<TState, TKey extends keyof TState & string> = [
    TState[TKey],
    UpdateValue<TState, TKey>,
    ContextControl<TState>
] & {
    value: TState[TKey];
    setValue: UpdateValue<TState, TKey>;
    contextControl: ContextControl<TState>;
};

type UseSubscribeStateReturn<TState> = [
    TState,
    ContextControl<TState>["setState"],
    ContextControl<TState>
] & {
    state: TState;
    setState: ContextControl<TState>["setState"];
    contextControl: ContextControl<TState>;
};

export function useSubscribe<TState, TKey extends keyof TState & string>(
    Context: Context<ContextControl<TState>>,
    key: TKey
): UseSubscribeValueReturn<TState, TKey>;

export function useSubscribe<TState>(
    Context: Context<ContextControl<TState>>,
    key?: undefined | null
): UseSubscribeStateReturn<TState>;

export function useSubscribe<TState extends object, TKey extends keyof TState & string>(
    Context: Context<ContextControl<TState>>,
    key: TKey | undefined | null
): UseSubscribeValueReturn<TState, TKey> | UseSubscribeStateReturn<TState> {
    const contextControl = useContext(Context);
    const { emitter, getState, getValue, setValue, setState } = contextControl;
    const [, setFakeValue] = useState({});
    const rerender = useCallback(() => setFakeValue({}), []);
    const subscribedCache = useRef<SubscribedCache>({});

    const updateValue: UpdateValue<TState, TKey> = useCallback(
        (value) => {
            if (!key) {
                throw new Error("Somehow updating a value when should be updating state");
            }

            if (value instanceof Function) {
                setValue(key, value);
            } else {
                setValue(key, value);
            }
        },
        [key, setValue]
    );

    const stateProxyHandler = useMemo(
        () => createProxyHandler<any>(subscribedCache, rerender),
        [rerender]
    );

    const valueProxyHandler = useMemo(
        () => createProxyHandler<any>(subscribedCache, rerender, key as string),
        [rerender, key]
    );

    useEffect(() => {
        if (key) {
            const value = getValue(key);

            if (typeof value !== "object" || Array.isArray(value)) {
                subscribedCache.current[getUpdateEventName(key)] = true;
            }
        }

        const events = (Object.keys(subscribedCache.current) as `update-${string}`[]).filter(
            (path) => subscribedCache.current[path]
        );

        events.forEach((event) => {
            emitter.on(event, rerender);
        });

        return () => {
            events.forEach((event) => {
                emitter.off(event, rerender);
            });
        };
    }, [emitter, rerender, key, getValue]);

    if (key) {
        const value = getValue(key);
        let result: any[] & any = [getValue(key)];

        if (typeof value === "object" && !Array.isArray(value)) {
            result = [deepProxy(value, valueProxyHandler)];
        }

        result.push(updateValue, contextControl);

        result.value = result[0];
        result.setValue = updateValue;
        result.contextControl = contextControl;

        return result;
    }

    const result: any = [deepProxy(getState(), stateProxyHandler), setState, contextControl];

    result.state = result[0];
    result.setValue = setState;
    result.contextControl = contextControl;

    return result as UseSubscribeStateReturn<TState>;
}
