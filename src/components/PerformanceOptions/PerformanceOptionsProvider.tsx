import { ReactElement, useState } from "react";
import {
    defaultPerformanceContextState,
    PerformanceOptionContextState,
    PerformanceOptionsContext,
} from "./PerformanceOptionsContext";

export const PerformaceOptionsProvider = ({
    children,
}: {
    children: ReactElement | ReactElement[];
}): ReactElement => {
    const [state, setState] = useState(defaultPerformanceContextState.state);

    const contextState: PerformanceOptionContextState = {
        state,
        setState: (nextState) => setState({ ...state, ...nextState }),
    };

    return (
        <PerformanceOptionsContext.Provider value={contextState}>
            {children}
        </PerformanceOptionsContext.Provider>
    );
};
