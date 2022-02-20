import EventEmitter from "events";

type Key<TState> = keyof TState & string;

export type SetValue<TState> = <TKey extends Key<TState>, TValue extends TState[TKey]>(
    key: TKey,
    value: TValue
) => void;

export type GetValue<TState> = <TKey extends Key<TState>>(key: TKey) => TState[TKey];

export interface ControlState<TState> {
    emitter: EventEmitter;
    getValue: GetValue<TState>;
    setState: (newStateValues: Partial<TState>) => void;
    setValue: SetValue<TState>;
    state: TState;
}
