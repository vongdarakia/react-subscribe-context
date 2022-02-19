import { ReactElement, useState } from "react";
import { BasicContext, BasicContextState, defaultBasicState } from "../../contexts/BasicContext";
import { ComponentA } from "./ComponentA";

export const MemoDemo = (): ReactElement => {
    const [state, setState] = useState(defaultBasicState);

    const updateValue: BasicContextState["setState"] = (key, value) => {
        setState({ ...state, [key]: value });
    };

    return (
        <BasicContext.Provider value={{ state, setState: updateValue }}>
            <ComponentA />
        </BasicContext.Provider>
    );
};
