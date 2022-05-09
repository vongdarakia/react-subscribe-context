import { EventEmitter } from 'events';
import { Context, createContext, ReactElement, ReactNode } from 'react';
import { ActionsCreator, BaseContextControl, ContextControl } from './context-control-types';
import { useSubscribeProvider } from './useSubscribeProvider';

interface CreateControlContextConfig<TState, TActions> {
    /**
     * Initial state that the context will be based off of.
     */
    initialState: TState;
    /**
     * Function used to create reusable actions that updates the state.
     */
    createActions?: ActionsCreator<TState, TActions>;
}

type ControlProvider = (props: {
    children: ReactElement | ReactElement[] | ReactNode;
}) => JSX.Element;

type ContextReturn<TState, TActions extends object> = [
    Context<ContextControl<TState, TActions>>,
    ControlProvider
] & {
    Context: Context<ContextControl<TState, TActions>>;
    Provider: ControlProvider;
};

/**
 * Creates a context and provider to help control.
 * @param config Configuration options of the control context.
 * @returns A tuple of a control context and provider.
 */
export const createSubscriberContext = <TState, TActions extends object>({
    initialState,
    createActions,
}: CreateControlContextConfig<TState, TActions>): ContextReturn<TState, TActions> => {
    const baseControl: BaseContextControl<TState> = {
        emitter: new EventEmitter(),
        getState: () => {
            console.error('Did you forget to use your control provider?');
            return initialState;
        },
        getValue: (fieldName) => {
            console.error('Did you forget to use your control provider?');
            return initialState[fieldName];
        },
        setState: () => {
            console.error('Did you forget to use your control provider?');
        },
        setValue: () => {
            console.error('Did you forget to use your control provider?');
        },
    };

    const initialControl: ContextControl<TState, TActions> = {
        ...baseControl,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        actions: {},
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
