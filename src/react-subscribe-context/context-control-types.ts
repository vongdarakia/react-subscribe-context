import { EventEmitter } from "events";

type Key<TState> = keyof TState & string;

export interface SetValue<TState> {
    <TKey extends Key<TState>>(key: TKey, nextValue: TState[TKey]): void | Promise<void>;
    <TKey extends Key<TState>>(
        key: TKey,
        getNextValue: (value: TState[TKey], state: TState) => TState[TKey]
    ): void | Promise<void>;
}

export interface SetState<TState> {
    (nextState: Partial<TState>): void | Promise<void>;
    (getNextState: (state: TState) => Partial<TState>): void | Promise<void>;
}

export type GetValue<TState> = <TKey extends Key<TState>>(key: TKey) => TState[TKey];

export type GetState<TState> = () => TState;

export interface BaseContextControl<TState> {
    emitter: EventEmitter;
    getValue: GetValue<TState>;
    getState: GetState<TState>;
    setValue: SetValue<TState>;
    setState: SetState<TState>;
}

export interface ContextControl<TState, TActions extends object>
    extends BaseContextControl<TState> {
    actions: TActions;
}

export type ActionsCreator<TState, TActions> = (
    contextControl: BaseContextControl<TState>
) => TActions;
