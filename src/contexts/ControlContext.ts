import EventEmitter from "events";
import { createContext } from "react";

export type SetValue = <TKey extends ControlStateField, TValue extends IncomingState[TKey]>(
    key: TKey,
    value: TValue
) => void;

export type GetValue = <Key extends ControlStateField>(key: Key) => IncomingState[Key];

export interface ControlState {
    emitter: EventEmitter;
    getValue: GetValue;
    setState: (nextState: Partial<IncomingState>) => void;
    setValue: SetValue;
    state: IncomingState;
}

export interface IncomingState {
    name: string;
    description: string;
    age: number;
}

export type ControlStateField = keyof IncomingState;

export const defaultState: IncomingState = {
    name: "",
    description: "This is describing something deep",
    age: 28,
};

export const defaultControl: ControlState = {
    emitter: new EventEmitter(),
    getValue: (fieldName) => {
        return defaultState[fieldName];
    },
    setState: () => {},
    setValue: (...args) => {
        console.log(args);
    },
    state: defaultState,
};

export const ControlContext = createContext<ControlState>(defaultControl);
