import { ReactElement, useRef } from "react";
import {
    ControlContext,
    ControlState,
    defaultControl,
    IncomingState,
} from "../../../contexts/ControlContext";

export const ControlProvider = ({ children }: { children: ReactElement }): ReactElement => {
    const control = useRef<ControlState>(defaultControl);

    control.current.setState = (nextState: Partial<IncomingState>) => {
        control.current.state = { ...control.current.state, ...nextState };
        control.current.emitter.emit("update", { ...control.current.state });
    };

    control.current.setValue = (key, value) => {
        console.log({ key, value });
        control.current.state[key] = value;
        control.current.emitter.emit(`update-${key}`, value);
    };

    control.current.getValue = (fieldName) => control.current.state[fieldName];

    return <ControlContext.Provider value={control.current}>{children}</ControlContext.Provider>;
};
