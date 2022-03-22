import { EventEmitter } from "events";

type Key<TState> = keyof TState & string;

export interface SetValue<TState> {
    <TKey extends Key<TState>, TValue extends TState[TKey]>(
        key: TKey,
        value: TValue
    ): void | Promise<void>;
    <TKey extends Key<TState>, TValue extends TState[TKey]>(
        key: TKey,
        getState: (state: TState) => TValue
    ): void | Promise<void>;
}

export interface SetState<TState> {
    (nextState: Partial<TState>): void | Promise<void>;
    (getState: (state: TState) => Partial<TState>): void | Promise<void>;
}

export type GetValue<TState> = <TKey extends Key<TState>>(key: TKey) => TState[TKey];

export type GetState<TState> = () => TState;

export interface ContextControl<TState> {
    emitter: EventEmitter;
    getValue: GetValue<TState>;
    getState: GetState<TState>;
    setValue: SetValue<TState>;
    setState: SetState<TState>;
}
