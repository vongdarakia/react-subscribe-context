import { ReactElement, useRef, useState } from "react";
import { PerformanceOptions } from "../PerformanceOptions/PerformanceOptions";
import { AdvancedContext, AdvancedContextState, advancedContextState } from "./AdvancedContext";
import { AdvancedList } from "./AdvancedList";

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

    return (
        <AdvancedContext.Provider value={control.current}>
            {/* <input onChange={() => setSomething(something + 1)} /> */}
            <PerformanceOptions />
            <AdvancedList />
        </AdvancedContext.Provider>
    );
};
