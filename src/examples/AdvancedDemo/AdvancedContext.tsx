import { createContext } from "react";

export interface AdvancedContextState {
    setState: (nextState: { [key: `advanced-prop-${number}`]: number }) => void;
    setValue: (key: `advanced-prop-${number}`, value: number) => void;
    [key: `advanced-prop-${number}`]: number;
}

export const advancedContextState: AdvancedContextState = {
    setState: () => {},
    setValue: () => {},
};

export const AdvancedContext = createContext(advancedContextState);
