import { createContext } from "react";

export const defaultBasicState = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
};

export const defaultBasicContextState = {
    state: defaultBasicState,
    setState: () => {},
};

export interface BasicContextState {
    state: typeof defaultBasicState;
    setState: (key: keyof typeof defaultBasicState, value: number) => void;
}

export const BasicContext = createContext<BasicContextState>(defaultBasicContextState);
