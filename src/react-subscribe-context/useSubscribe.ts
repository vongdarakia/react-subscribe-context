import deepProxy from "deep-proxy-polyfill";
import { Context, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createProxyHandler, SubscribedCache } from "react-subscribe-context/createProxyHandler";
import { getUpdateEventName } from "utils/getUpdateEventName";
import { ContextControl } from "./subscriber-types";

interface UpdateValue<TState, TKey extends keyof TState & string> {
    (value: TState[TKey]): void;
    (getValue: (value: TState[TKey]) => TState[TKey]): void;
}

interface UpdateState<TState> {
    (stateValues: Partial<TState>): void;
    (getState: (state: TState) => Partial<TState>): void;
}

type UseSubscribeValueReturn<TState, TKey extends keyof TState & string> = [
    TState[TKey],
    UpdateValue<TState, TKey>,
    ContextControl<TState>
];

type UseSubscribeStateReturn<TState> = [TState, UpdateState<TState>, ContextControl<TState>];

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
    const contextState = useContext(Context);
    const { emitter, getState, getValue, setValue, setState } = contextState;
    const [, setFakeValue] = useState({});
    const rerender = useCallback(() => setFakeValue({}), []);
    const subscribedCache = useRef<SubscribedCache>({});

    const updateState: UpdateState<TState> = useCallback(
        (values) => {
            if (values instanceof Function) {
                return setState(values(getState()));
            }
            setState(values);
        },
        [getState, setState]
    );

    const updateValue: UpdateValue<TState, TKey> = useCallback(
        (value) => {
            if (value instanceof Function) {
                setValue(key as TKey, value(getValue(key as TKey)));
            } else {
                setValue(key as TKey, value);
            }
        },
        [key, setValue, getValue]
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
        const handleValueUpdated = () => {
            rerender();
        };

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
            emitter.on(event, handleValueUpdated);
        });

        return () => {
            events.forEach((event) => {
                emitter.off(event, handleValueUpdated);
            });
        };
    }, [emitter, rerender, key, getValue]);

    if (key) {
        const value = getValue(key);

        if (typeof value === "object" && !Array.isArray(value)) {
            return [deepProxy(value, valueProxyHandler), updateValue, contextState];
        }

        return [value, updateValue, contextState];
    }

    return [deepProxy(getState(), stateProxyHandler), updateState, contextState];
}
