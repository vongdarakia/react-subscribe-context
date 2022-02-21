import { ReactElement, useContext, useEffect, useState } from "react";
import { getIncrementedNumValue } from "../../utils/getIncrementedNumValue";
import { PerformanceOptions } from "../PerformanceOptions/PerformanceOptions";
import { PerformanceOptionsContext } from "../PerformanceOptions/PerformanceOptionsContext";
import { BasicContext, basicContextState } from "./BasicContext";
import { BasicList } from "./BasicList";

export const BasicDemo = (): ReactElement => {
    const [state, setState] = useState(basicContextState);
    const {
        state: { numElements },
    } = useContext(PerformanceOptionsContext);

    const handleSetValue: typeof basicContextState["setValue"] = (key, value) => {
        const newState: typeof state = { ...state };

        newState[key] = value;

        setState(newState);
    };

    useEffect(() => {
        const newState: typeof state = { ...state };

        for (let i = 0; i < numElements; i++) {
            newState[`basic-item-${i}`] = getIncrementedNumValue(i);
        }

        setState(newState);
    }, []);

    console.log("render basic demo");

    return (
        <BasicContext.Provider value={{ ...state, setValue: handleSetValue }}>
            <PerformanceOptions />
            <BasicList />
        </BasicContext.Provider>
    );
};
