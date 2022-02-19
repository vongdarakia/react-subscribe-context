import { useRef } from "react";
import { ControlState, defaultControl, IncomingState } from "../contexts/ControlContext";

export const useControl = () => {
    const control = useRef<ControlState>(defaultControl);

    control.current.setState = (nextState: Partial<IncomingState>) => {
        console.log(nextState);
        control.current.state = { ...control.current.state, ...nextState };
        control.current.emitter.emit("update", { ...control.current.state });
    };

    control.current.setValue = (field, value) => {
        console.log({ field, value });
        control.current.state[field] = value;
        control.current.emitter.emit(`update-${field}`, value);
    };

    control.current.getValue = (fieldName) => control.current.state[fieldName];

    return control;
};
