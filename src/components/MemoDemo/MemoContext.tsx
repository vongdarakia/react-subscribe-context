import { createContext } from "react";

export const defaultMemoState = {
    c: 0,
};

export const defaultMemoContextState = {
    showRendered: false,
    state: defaultMemoState,
    setState: () => {},
    toggleShowRendered: () => {},
};

export interface MemoContextState {
    showRendered: boolean;
    state: typeof defaultMemoState;
    setState: (key: keyof typeof defaultMemoState, value: number) => void;
    toggleShowRendered: () => void;
}

export const MemoContext = createContext<MemoContextState>(defaultMemoContextState);
