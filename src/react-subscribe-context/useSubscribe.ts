import { Context, useCallback, useContext, useEffect, useState } from "react";
import { getUpdateEventName } from "utils/getUpdateEventName";
import { ControlState } from "./subscriber-types";

type UseSubscribeReturn<TState, TKey extends keyof TState & string> = [
    TState[TKey],
    (value: TState[TKey]) => void
];

export const useSubscribe = <TState, TKey extends keyof TState & string>(
    Context: Context<ControlState<TState>>,
    key: TKey
): UseSubscribeReturn<TState, TKey> => {
    const { emitter, getValue, setValue } = useContext(Context);
    const [, updateState] = useState({});
    const rerender = useCallback(() => updateState({}), []);

    useEffect(() => {
        const handleValueUpdated = () => {
            rerender();
        };

        const eventName = getUpdateEventName(key);

        emitter.on(eventName, handleValueUpdated);

        return () => {
            // console.log("unmounting emitter for", eventName);
            emitter.off(eventName, handleValueUpdated);
        };
    }, [emitter, rerender, key]);

    const value = getValue(key);

    const updateValue: UseSubscribeReturn<TState, TKey>["1"] = (value) => {
        setValue(key, value);
    };

    return [value, updateValue];
};
