import { EventEmitter } from "events";
import { Context, createContext, ReactElement } from "react";
import { ContextControl } from "./subscriber-types";
import { useSubscribeProvider } from "./useSubscribeProvider";

interface CreateControlContextOptions<TState> {
    initialState: TState;
}

type CustomProvider = (props: { children: ReactElement | ReactElement[] }) => JSX.Element;

type ContextReturn<TState> = [Context<ContextControl<TState>>, CustomProvider] & {
    Context: Context<ContextControl<TState>>;
    Provider: CustomProvider;
};

export const createSubscriberContext = <TState,>({
    initialState,
}: CreateControlContextOptions<TState>): ContextReturn<TState> => {
    const initialControl: ContextControl<TState> = {
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
    };

    const Context = createContext<ContextControl<TState>>(initialControl);

    const Provider = ({ children }: { children: ReactElement | ReactElement[] }) => {
        const control = useSubscribeProvider<TState, ContextControl<TState>>(
            initialControl,
            initialState
        );

        return <Context.Provider value={control.current}>{children}</Context.Provider>;
    };

    const result = [Context, Provider] as any;

    result.Context = Context;
    result.Provider = Provider;

    return result as ContextReturn<TState>;
};
