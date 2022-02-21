import { createContext } from "react";

const DEFAULT_NUM_ITEMS = 10;

export interface PerformanceOptionState {
    numElements: number;
    shouldUseMemo: boolean;
}

export interface PerformanceOptionContextState {
    state: PerformanceOptionState;
    setState: (nextState: Partial<PerformanceOptionState>) => void;
}

export const defaultPerformanceContextState: PerformanceOptionContextState = {
    state: {
        numElements: DEFAULT_NUM_ITEMS,
        shouldUseMemo: false,
    },
    setState: () => {},
};

export const PerformanceOptionsContext = createContext(defaultPerformanceContextState);
