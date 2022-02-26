import { ReactElement, useRef, useState } from "react";
import { logColor } from "../../../utils/logColor";
import { logRender } from "../../../utils/logRender";
import { PerformanceOptions } from "../../demos/PerformanceOptions/PerformanceOptions";
import { AdvancedContext, AdvancedContextState, advancedContextState } from "./AdvancedContext";
import { AdvancedList } from "./AdvancedList";
import { ADVANCED_COLOR } from "./colors";

export const AdvancedDemo = (): ReactElement => {
    const control = useRef<AdvancedContextState>(advancedContextState);
    const [state, setState] = useState(advancedContextState);
    // const [something, setSomething] = useState(0);

    const handleSetState = (nextState: Partial<typeof advancedContextState>) => {
        setState({ ...state, ...nextState });
    };

    if (control.current) {
        control.current.items = state.items;
        control.current.setState = handleSetState;
    }

    logRender("%cAdvancedProvider", logColor(ADVANCED_COLOR));

    return (
        <AdvancedContext.Provider value={control.current}>
            {/* <input onChange={() => setSomething(something + 1)} /> */}
            <PerformanceOptions />
            <AdvancedList />
        </AdvancedContext.Provider>
    );
};
