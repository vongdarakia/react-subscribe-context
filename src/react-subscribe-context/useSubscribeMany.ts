import { Context, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getUpdateEventName } from "../utils/getUpdateEventName";
import { ControlState } from "./subscriber-types";

type UseSubscribeReturn<TState> = [TState, (value: Partial<TState>) => void];

// type UseSubscribe = <TState, TKey extends keyof TState & string>(
//     Context: Context<ControlState<TState>>,
//     key: TKey
// ) => UseSubscribeReturn<TState, TKey>;

export const useSubscribeMany = <TState extends object, TKey extends keyof TState & string>(
    Context: Context<ControlState<TState>>,
    key: TKey
): UseSubscribeReturn<TState> => {
    const { emitter, getValue, setState, getState } = useContext(Context);
    const state = getState();
    const [, updateState] = useState({});
    const rerender = useCallback(() => updateState({}), []);
    const subscribedEvents = useMemo(() => [] as `update-${string}`[], []);
    const handler = useMemo(
        (): ProxyHandler<TState> => ({
            get: (obj, prop: TKey) => {
                // console.log({ subscribedEvents, key });
                if (!subscribedEvents.includes(getUpdateEventName(key))) {
                    subscribedEvents.push(getUpdateEventName(key));
                    console.log("subscribed to", key);
                    rerender();
                }
                // console.log("getting prop", prop, "value", obj[prop]);
                return obj[prop];
            },
        }),
        []
    );
    const proxy = new Proxy(state, handler);

    useEffect(() => {
        // console.log("useSubscribe", key);
        // const eventName = getUpdateEventName(key);
        const handleEvent = (something: any) => {
            console.log("rerendering", something);
            rerender();
        };

        subscribedEvents.forEach((event) => {
            emitter.on(event, handleEvent);
            console.log("mount emitter for", event);
        });

        return () => {
            subscribedEvents.forEach((event) => {
                emitter.off(event, handleEvent);
                console.log("unmounting emitter for", event);
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subscribedEvents.length]);

    return [proxy, setState];
};
