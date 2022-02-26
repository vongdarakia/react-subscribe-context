import { Context, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getUpdateEventName } from "utils/getUpdateEventName";
import { ControlState } from "./subscriber-types";

interface StateSetter<TState> {
    (value: Partial<TState>): void;
    (stateGetter: (state: TState) => Partial<TState>): void;
}

type UseSubscribeReturn<TState> = [TState, StateSetter<TState>];

export const useSubscribeMany = <TState extends object, TKey extends keyof TState & string>(
    Context: Context<ControlState<TState>>
): UseSubscribeReturn<TState> => {
    const { emitter, setState, getState } = useContext(Context);
    const state = getState();
    const [, updateState] = useState({});
    const rerender = useCallback(() => updateState({}), []);
    const subscribedEvents = useMemo(() => [] as `update-${string}`[], []);

    const handler = useMemo(
        (): ProxyHandler<TState> => ({
            get: (obj, prop: TKey) => {
                if (!subscribedEvents.includes(getUpdateEventName(prop))) {
                    subscribedEvents.push(getUpdateEventName(prop));
                    console.log("subscribed to", prop);
                    rerender();
                }

                return obj[prop];
            },
        }),
        [rerender, subscribedEvents]
    );
    const proxyState = new Proxy(state, handler);

    useEffect(() => {
        const handleEvent = () => {
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
    }, [subscribedEvents.length, subscribedEvents, rerender, emitter]);

    const setter: StateSetter<TState> = (values) => {
        if (values instanceof Function) {
            return setState(values(getState()));
        }
        setState(values);
    };

    return [proxyState, setter];
};
