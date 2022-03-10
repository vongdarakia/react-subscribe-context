import { useRef } from "react";
import { getUpdateEventName } from "utils/getUpdateEventName";
import { ContextControl } from "./subscriber-types";

interface ObjectDiff {
    [key: string]: boolean;
}

const getObjectDiff = <TObject extends Object>(
    oldObj: TObject,
    newObj: TObject,
    path: string = ""
): ObjectDiff => {
    const keys = Object.keys(newObj) as (keyof TObject & string)[];
    const results: ObjectDiff = {};

    keys.forEach((key) => {
        if (newObj[key] !== oldObj[key]) {
            const currentPath = path.length > 0 ? `${path}.${key}` : key;

            if (typeof newObj[key] === "object" && !Array.isArray(newObj[key])) {
                const keyDiffs = getObjectDiff(oldObj[key], newObj[key], currentPath);

                Object.keys(keyDiffs).forEach((diffKey: string) => {
                    results[diffKey] = keyDiffs[diffKey];
                });
            } else {
                results[currentPath] = true;
            }
        }
    });

    return results;
};

export const useSubscribeProvider = <TState, TControlState extends ContextControl<TState>>(
    initialControl: TControlState,
    initialState: TState
) => {
    const control = useRef<TControlState>({ ...initialControl });
    const contextState = useRef<TState>({ ...initialState });

    control.current.setState = (nextState: Partial<TState>) => {
        const objectDiff = getObjectDiff(contextState.current, nextState);

        contextState.current = { ...contextState.current, ...nextState };
        control.current.emitter.emit("update-state", contextState.current);

        Object.keys(objectDiff).forEach((key) => {
            control.current.emitter.emit(getUpdateEventName(key), nextState);
        });
    };

    control.current.setValue = (key, value) => {
        const partialUpdatedState = { [key]: value } as unknown as Partial<TState>;
        const objectDiff = getObjectDiff(contextState.current, partialUpdatedState);
        const newState = { ...contextState.current, [key]: value };

        contextState.current = newState;
        control.current.emitter.emit(getUpdateEventName(key), value);

        Object.keys(objectDiff).forEach((key) => {
            control.current.emitter.emit(getUpdateEventName(key), partialUpdatedState);
        });
    };

    control.current.getValue = (fieldName) => contextState.current[fieldName];
    control.current.getState = () => contextState.current;

    return control;
};
