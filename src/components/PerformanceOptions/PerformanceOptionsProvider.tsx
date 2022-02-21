import { ReactElement, useState } from "react";
import { logColor } from "../../utils/logColor";
import { logRender } from "../../utils/logRender";
import {
    defaultPerformanceContextState,
    PerformanceOptionsContext,
    PerformanceOptionsContextState,
} from "./PerformanceOptionsContext";

export const PerformanceOptionsProvider = ({
    children,
}: {
    children: ReactElement | ReactElement[];
}): ReactElement => {
    const [state, setState] = useState(defaultPerformanceContextState.state);

    const contextState: PerformanceOptionsContextState = {
        state,
        setState: (nextState) => setState({ ...state, ...nextState }),
    };

    logRender("%cPerformanceOptions", logColor("#"));

    return (
        <PerformanceOptionsContext.Provider value={contextState}>
            {children}
        </PerformanceOptionsContext.Provider>
    );
};
