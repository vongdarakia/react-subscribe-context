import { ReactElement, useState } from "react";
import { logColor } from "../../utils/logColor";
import { logRender } from "../../utils/logRender";
import { PerformanceOptions } from "../PerformanceOptions/PerformanceOptions";
import { BasicContext, basicContextState } from "./BasicContext";
import { BasicList } from "./BasicList";
import { BASIC_COLOR } from "./colors";

export const BasicDemo = (): ReactElement => {
    const [state, setState] = useState(basicContextState);

    const handleSetValue: typeof basicContextState["setValue"] = (key, value) => {
        const newState: typeof state = { ...state };

        newState[key] = value;

        setState(newState);
    };

    const handleSetState: typeof basicContextState["setState"] = (nextState) => {
        const newState: typeof state = { ...state, ...nextState };

        setState(newState);
    };

    logRender("%cBasicDemo", logColor(BASIC_COLOR));

    return (
        <BasicContext.Provider
            value={{ ...state, setValue: handleSetValue, setState: handleSetState }}
        >
            <PerformanceOptions />
            <BasicList />
        </BasicContext.Provider>
    );
};
