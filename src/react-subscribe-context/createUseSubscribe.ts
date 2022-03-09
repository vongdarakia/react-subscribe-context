import { Context, useCallback, useContext, useEffect, useState } from "react";
import { getUpdateEventName } from "utils/getUpdateEventName";
import { ControlState } from "./subscriber-types";

export const createUseSubscribe = <TState>(Context: Context<ControlState<TState>>) => {
    type UseSubscribeReturn<TKey extends keyof TState> = [
        TState[TKey],
        (value: TState[TKey]) => void
    ];

    const useSubscribeAll = <TKey extends keyof TState & string>(
        key: TKey
    ): UseSubscribeReturn<TKey> => {
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
                emitter.off(eventName, handleValueUpdated);
            };
        }, [emitter, rerender, key]);

        const value = getValue(key);

        const updateValue: UseSubscribeReturn<TKey>["1"] = (value) => {
            setValue(key, value);
        };

        return [value, updateValue];
    };

    return useSubscribeAll;
};
