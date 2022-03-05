import { EventEmitter } from "events";
import { createContext, ReactElement } from "react";
import { createUseSubscribe } from "./createUseSubscribe";
import { ControlState } from "./subscriber-types";
import { useSubscribeProvider } from "./useSubscribeProvider";

interface CreateControlContextOptions<TState> {
    initialState: TState;
}

export const createSubscriberContext = <TState,>({
    initialState,
}: CreateControlContextOptions<TState>) => {
    const defaultControl: ControlState<TState> = {
        emitter: new EventEmitter(),
        getState: () => {
            console.error("Did you forget to use your control provider?");
            return initialState;
        },
        getValue: (fieldName) => {
            console.error("Did you forget to use your control provider?");
            return initialState[fieldName];
        },
        setState: () => {
            console.error("Did you forget to use your control provider?");
        },
        setValue: () => {
            console.error("Did you forget to use your control provider?");
        },
        state: initialState,
    };

    const Context = createContext<ControlState<TState>>(defaultControl);

    const Provider = ({ children }: { children: ReactElement | ReactElement[] }) => {
        const control = useSubscribeProvider<TState, ControlState<TState>>(defaultControl);

        return <Context.Provider value={{ ...control.current }}>{children}</Context.Provider>;
    };

    const useSubscribe = createUseSubscribe<TState>(Context);

    return { Context, Provider, useSubscribe };
};
