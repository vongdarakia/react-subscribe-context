import { EventEmitter } from "events";
import { Context, createContext, ReactElement } from "react";
import { ActionsCreator, BaseContextControl, ContextControl } from "./context-control-types";
import { useSubscribeProvider } from "./useSubscribeProvider";

interface CreateControlContextOptions<TState, TActions> {
    initialState: TState;
    createActions?: ActionsCreator<TState, TActions>;
}

type CustomProvider = (props: { children: ReactElement | ReactElement[] }) => JSX.Element;

type ContextReturn<TState, TActions extends object> = [
    Context<ContextControl<TState, TActions>>,
    CustomProvider
] & {
    Context: Context<ContextControl<TState, TActions>>;
    Provider: CustomProvider;
};

export const createSubscriberContext = <TState, TActions extends object>({
    initialState,
    createActions,
}: CreateControlContextOptions<TState, TActions>): ContextReturn<TState, TActions> => {
    const baseControl: BaseContextControl<TState> = {
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

    const initialControl: ContextControl<TState, TActions> = {
        ...baseControl,
        // @ts-ignore
        actions: createActions ? createActions(baseControl) : {},
    };
    const Context = createContext<ContextControl<TState, TActions>>(initialControl);

    const Provider = ({ children }: { children: ReactElement | ReactElement[] }) => {
        const control = useSubscribeProvider<TState, TActions, ContextControl<TState, TActions>>(
            initialControl,
            initialState,
            createActions
        );

        return <Context.Provider value={control.current}>{children}</Context.Provider>;
    };

    const result = [Context, Provider] as any;

    result.Context = Context;
    result.Provider = Provider;

    return result as ContextReturn<TState, TActions>;
};
