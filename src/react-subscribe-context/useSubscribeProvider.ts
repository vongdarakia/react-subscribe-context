import { useEffect, useRef } from "react";
import { getUpdateEventName } from "utils/getUpdateEventName";
import { ControlState } from "./subscriber-types";

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
            const nextPath = path.length > 0 ? `${path}.${key}` : key;

            if (typeof newObj[key] === "object") {
                const keyDiffs = getObjectDiff(oldObj[key], newObj[key], nextPath);

                Object.keys(keyDiffs).forEach((diffKey: string) => {
                    results[diffKey] = keyDiffs[diffKey];
                });
            } else {
                results[nextPath] = true;
            }
        }
    });

    return results;
};

export const useSubscribeProvider = <TState, TControlState extends ControlState<TState>>(
    defaultControl: TControlState
) => {
    const control = useRef<TControlState>({ ...defaultControl });

    control.current.setState = (nextState: Partial<TState>) => {
        const objectDiff = getObjectDiff(control.current.state, nextState);

        Object.keys(objectDiff).forEach((key) => {
            // console.log("state emitted", getUpdateEventName(key));
            control.current.emitter.emit(getUpdateEventName(key), nextState);
        });

        control.current.state = { ...control.current.state, ...nextState };
        control.current.emitter.emit("update-state", control.current.state);
    };

    control.current.setValue = (key, value) => {
        const nextState = { [key]: value } as unknown as Partial<TState>;
        const objectDiff = getObjectDiff(control.current.state, nextState);

        Object.keys(objectDiff).forEach((key) => {
            // console.log("state emitted", getUpdateEventName(key));
            control.current.emitter.emit(getUpdateEventName(key), nextState);
        });

        const newState = { ...control.current.state, [key]: value };

        control.current.state = newState;
        control.current.emitter.emit(getUpdateEventName(key), value);
    };

    control.current.getValue = (fieldName) => control.current.state[fieldName];
    control.current.getState = () => control.current.state;

    console.log("useSubscribeProvider", control);

    useEffect(() => {
        return () => {
            console.log("unmounting useSubscribeProvider");
        };
    }, []);

    return control;
};
