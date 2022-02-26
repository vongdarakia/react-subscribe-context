import { ReactElement, useState } from "react";
import { logColor } from "../../../utils/logColor";
import { logRender } from "../../../utils/logRender";
import { PERFORMANCE_OPTIONS_COLOR } from "./colors";
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

    logRender("%cPerformanceOptionsProvider", logColor(PERFORMANCE_OPTIONS_COLOR));

    return (
        <PerformanceOptionsContext.Provider value={contextState}>
            {children}
        </PerformanceOptionsContext.Provider>
    );
};
