import deepProxy from "deep-proxy-polyfill";
import { Context, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createProxyHandler, SubscribedCache } from "react-subscribe-context/createProxyHandler";
import { getUpdateEventName } from "utils/getUpdateEventName";
import { ContextControl, EventKey } from "./context-control-types";

const getSubscribedEvents = (subscribedCache: SubscribedCache) => {
    return (Object.keys(subscribedCache) as EventKey[]).filter((path) => subscribedCache[path]);
};

/**
 * Function that returns the new value of the field.
 * @param value Current value of the field.
 * @param state Current state
 * @returns Next value
 */
type GetNextValue<TState, TKey extends keyof TState & string> = (
    value: TState[TKey],
    state: TState
) => TState[TKey];

interface UpdateValue<TState, TKey extends keyof TState & string> {
    /**
     * The new value of the field.
     */
    (nextValue: TState[TKey]): void;

    /**
     * Function that returns the new value of the field.
     */
    (getNextValue: GetNextValue<TState, TKey>): void;
}

/**
 * An array of the value, value setter and context control
 */
type UseSubscribeValueArrayReturn<
    TState,
    TKey extends keyof TState & string,
    TActions extends object
> = [TState[TKey], UpdateValue<TState, TKey>, ContextControl<TState, TActions>];

/**
 * An object holding the value, value setter and context control
 */
type UseSubscribeValueObjectReturn<
    TState,
    TKey extends keyof TState & string,
    TActions extends object
> = {
    value: TState[TKey];
    setValue: UpdateValue<TState, TKey>;
    contextControl: ContextControl<TState, TActions>;
};

export type UseSubscribeValueReturn<
    TState,
    TKey extends keyof TState & string,
    TActions extends object
> = UseSubscribeValueArrayReturn<TState, TKey, TActions> &
    UseSubscribeValueObjectReturn<TState, TKey, TActions>;

/**
 * An array of the state, state setter and context control
 */
type UseSubscribeStateArrayReturn<TState, TActions extends object> = [
    TState,
    ContextControl<TState, TActions>["setState"],
    ContextControl<TState, TActions>
];

/**
 * An object holding the state, state setter and context control
 */
type UseSubscribeStateObjectReturn<TState, TActions extends object> = {
    state: TState;
    setState: ContextControl<TState, TActions>["setState"];
    contextControl: ContextControl<TState, TActions>;
};

export type UseSubscribeStateReturn<TState, TActions extends object> = UseSubscribeStateArrayReturn<
    TState,
    TActions
> &
    UseSubscribeStateObjectReturn<TState, TActions>;

/**
 * Accesses the control context and subscribes to specified value.
 * @param Context Control context that will be referenced.
 * @param key Field to access and subscribe to.
 */
export function useSubscribe<TState, TKey extends keyof TState & string, TActions extends object>(
    Context: Context<ContextControl<TState, TActions>>,
    key: TKey
): UseSubscribeValueReturn<TState, TKey, TActions>;

/**
 * Accesses to the control context and subscribes to any value accessed from the returned state.
 * @param Context Control context that will be referenced.
 * @param key Undefined field key will return a state.
 */
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
