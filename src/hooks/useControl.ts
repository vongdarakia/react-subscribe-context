import { useEffect, useRef } from "react";
import { ControlState } from "../types/control-types";
import { getUpdateEventName } from "../utils/getUpdateEventName";

export const useControl = <TState, TControlState extends ControlState<TState>>(
    defaultControl: TControlState
) => {
    const control = useRef<TControlState>({ ...defaultControl });

    control.current.setState = (nextState: Partial<TState>) => {
        // console.log({ nextState });
        for (const key in nextState) {
            if (control.current.state[key] !== nextState[key]) {
                control.current.emitter.emit(getUpdateEventName(key), nextState[key]);
            }
        }

        control.current.state = { ...control.current.state, ...nextState };
        control.current.emitter.emit("update-state", control.current.state);
    };

    control.current.setValue = (key, value) => {
        // console.log({ key, value });
        if (control.current.state[key] !== value) {
            control.current.state = { ...control.current.state, [key]: value };
            control.current.emitter.emit(getUpdateEventName(key), value);
        }
    };

    control.current.getValue = (fieldName) => control.current.state[fieldName];

    console.log("useControl", control);

    useEffect(() => {
        return () => {
            console.log("unmounting useControl");
        };
    }, []);

    return control;
};
