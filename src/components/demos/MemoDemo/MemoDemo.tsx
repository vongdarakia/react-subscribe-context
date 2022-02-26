import { ReactElement, useState } from "react";
import { ComponentA } from "./ComponentA";
import { defaultMemoState, MemoContext, MemoContextState } from "./MemoContext";

export const MemoDemo = (): ReactElement => {
    const [state, setState] = useState(defaultMemoState);
    const [showRendered, setShowRendered] = useState(false);

    const updateValue: MemoContextState["setState"] = (key, value) => {
        setState({ ...state, [key]: value });
    };

    const toggleShowRendered = () => {
        setShowRendered(!showRendered);
    };

    const contextState = {
        state,
        setState: updateValue,
        toggleShowRendered,
        showRendered,
    };

    return (
        <MemoContext.Provider value={contextState}>
            <div
                className={showRendered ? "rendered-component" : ""}
                style={{
                    color: "whitesmoke",
                    textAlign: "left",
                    padding: 24,
                    border: "1px solid whitesmoke",
                }}
            >
                <div className="text" style={{ marginBottom: 24 }}>
                    Provider Component
                </div>
                <ComponentA />
            </div>
        </MemoContext.Provider>
    );
};
