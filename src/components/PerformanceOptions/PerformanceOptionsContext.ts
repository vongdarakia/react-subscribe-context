import { createContext } from "react";

const DEFAULT_NUM_ITEMS = 10;

export interface PerformanceOptionsState {
    numElements: number;
    shouldUseMemo: boolean;
}

export interface PerformanceOptionsContextState {
    state: PerformanceOptionsState;
    setState: (nextState: Partial<PerformanceOptionsState>) => void;
}

export const defaultPerformanceContextState: PerformanceOptionsContextState = {
    state: {
        numElements: DEFAULT_NUM_ITEMS,
        shouldUseMemo: false,
    },
    setState: () => {},
};

export const PerformanceOptionsContext = createContext(defaultPerformanceContextState);
