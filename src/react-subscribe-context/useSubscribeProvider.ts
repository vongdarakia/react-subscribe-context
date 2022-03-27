import { useRef } from "react";
import { getUpdateEventName } from "utils/getUpdateEventName";
import { ContextControl } from "./context-control-types";
import { getStateChanges } from "./getStateChanges";

export const useSubscribeProvider = <TState, TControlState extends ContextControl<TState>>(
    initialControl: TControlState,
    initialState: TState
) => {
    const control = useRef<TControlState>({ ...initialControl });
    const contextState = useRef<TState>({ ...initialState });

    control.current.setState = (getNextState) => {
        let nextState = getNextState;

        if (nextState instanceof Function) {
            nextState = nextState(control.current.getState());
        }

        const stateChanges = getStateChanges(contextState.current, nextState);

        contextState.current = { ...contextState.current, ...nextState };
        control.current.emitter.emit("update-state", contextState.current);

        Object.keys(stateChanges).forEach((key) => {
            control.current.emitter.emit(getUpdateEventName(key), nextState);
        });
    };

    control.current.setValue = (key, getNextValue) => {
        let nextValue = getNextValue;

        if (nextValue instanceof Function) {
            nextValue = nextValue(control.current.getValue(key), control.current.getState());
        }

        const partialUpdatedState = { [key]: nextValue } as unknown as Partial<TState>;
        const stateChanges = getStateChanges(contextState.current, partialUpdatedState);

        contextState.current = { ...contextState.current, [key]: nextValue };

        Object.keys(stateChanges).forEach((key) => {
            control.current.emitter.emit(getUpdateEventName(key), partialUpdatedState);
        });
    };

    control.current.getValue = (fieldName) => contextState.current[fieldName];
    control.current.getState = () => contextState.current;

    return control;
};
