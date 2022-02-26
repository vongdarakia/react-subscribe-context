import { createContext } from "react";

export interface AdvancedContextState {
    items: { id: `advanced-prop-${number}`; value: number }[];
    setState: (nextState: Partial<typeof advancedContextState>) => void;
}

export const advancedContextState: AdvancedContextState = {
    items: [],
    setState: () => {},
};

export const AdvancedContext = createContext(advancedContextState);
