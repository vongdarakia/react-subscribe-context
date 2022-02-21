import { ReactElement, useState } from "react";
import { RENDER_COLOR } from "../../constants/colors";
import { logColor } from "../../utils/logColor";
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

    console.log("%crender %cPerformanceOptions", logColor(RENDER_COLOR), logColor("#B399A2"));

    return (
        <PerformanceOptionsContext.Provider value={contextState}>
            {children}
        </PerformanceOptionsContext.Provider>
    );
};
