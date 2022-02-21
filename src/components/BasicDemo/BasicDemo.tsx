import { ReactElement, useState } from "react";
import { PerformanceOptions } from "../PerformanceOptions/PerformanceOptions";
import { BasicContext, basicContextState } from "./BasicContext";
import { BasicList } from "./BasicList";

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

    console.log("render basic demo");

    return (
        <BasicContext.Provider
            value={{ ...state, setValue: handleSetValue, setState: handleSetState }}
        >
            <PerformanceOptions />
            <BasicList />
        </BasicContext.Provider>
    );
};
