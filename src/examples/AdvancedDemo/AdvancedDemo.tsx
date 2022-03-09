import { PerformanceOptions } from "components/PerformanceOptions/PerformanceOptions";
import { ReactElement, useCallback, useRef, useState } from "react";
import { logColor } from "utils/logColor";
import { logRender } from "utils/logRender";
import { AdvancedContext, AdvancedContextState, advancedContextState } from "./AdvancedContext";
import { AdvancedList } from "./AdvancedList";
import { ADVANCED_COLOR } from "./colors";

export const AdvancedDemo = (): ReactElement => {
    const state = useRef<AdvancedContextState>(advancedContextState);
    const [, setFakeValue] = useState({});
    const rerender = useCallback(() => setFakeValue({}), []);

    const handleSetState: typeof advancedContextState["setState"] = (nextState) => {
        Object.keys(nextState).forEach((k) => {
            const key = k as `advanced-prop-${number}`;
            state.current[key] = nextState[key];
        });

        rerender();
    };

    state.current.setState = handleSetState;

    logRender("%cAdvancedProvider", logColor(ADVANCED_COLOR));

    return (
        <AdvancedContext.Provider value={state.current}>
            <PerformanceOptions />
            <AdvancedList />
        </AdvancedContext.Provider>
    );
};
