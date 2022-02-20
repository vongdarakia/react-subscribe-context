import { Context, useCallback, useContext, useEffect, useState } from "react";
import { ControlState } from "../types/control-types";
import { getUpdateEventName } from "../utils/getUpdateEventName";

export const createUseSubscribe = <TState>(Context: Context<ControlState<TState>>) => {
    type UseSubscribeReturn<TKey extends keyof TState> = [
        TState[TKey],
        (value: TState[TKey]) => void
    ];

    const useSubscribe = <TKey extends keyof TState & string>(
        key: TKey
    ): UseSubscribeReturn<TKey> => {
        const { emitter, getValue, setValue } = useContext(Context);
        const [, updateState] = useState({});
        const rerender = useCallback(() => updateState({}), []);

        const handleValueUpdated = () => {
            rerender();
        };

        useEffect(() => {
            console.log("useSubscribe", key);
            const eventName = getUpdateEventName(key);

            emitter.on(eventName, handleValueUpdated);

            return () => {
                console.log("unmounting emmiter for", eventName);
                emitter.off(eventName, handleValueUpdated);
            };
        }, []);

        return [getValue(key), (value) => setValue(key, value)];
    };

    return useSubscribe;
};
