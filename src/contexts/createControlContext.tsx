import EventEmitter from "events";
import { createContext, ReactElement } from "react";
import { useControl } from "../hooks/useControl";
import { ControlState } from "../types/control-types";
import { createUseSubscribe } from "./createUseSubscribe";

interface CreateControlContextOptions<TState> {
    defaultState: TState;
}

export const createControlContext = <TState,>({
    defaultState,
}: CreateControlContextOptions<TState>) => {
    const defaultControl: ControlState<TState> = {
        emitter: new EventEmitter(),
        getValue: (fieldName) => {
            console.error("Did you forget to use your control provider?");
            return defaultState[fieldName];
        },
        setState: () => {
            console.error("Did you forget to use your control provider?");
        },
        setValue: () => {
            console.error("Did you forget to use your control provider?");
        },
        state: defaultState,
    };

    const Context = createContext<ControlState<TState>>(defaultControl);

    const Provider = ({ children }: { children: ReactElement }) => {
        const control = useControl<TState, ControlState<TState>>(defaultControl);

        return <Context.Provider value={{ ...control.current }}>{children}</Context.Provider>;
    };

    const useSubscribe = createUseSubscribe<TState>(Context);

    return { Context, Provider, useSubscribe };
};
