import { ReactElement, useContext } from "react";
import { commonStyle } from "../../utils/common-styles";
import { ComponentD } from "./ComponentD";
import { MemoContext } from "./MemoContext";

const buttonStyle = {
    padding: 16,
    minWidth: 100,
    width: "fit-content",
    cursor: "pointer",
    marginBottom: 24,
    fontSize: 16,
    fontWeight: "bold",
};

export const ComponentC = (): ReactElement => {
    const {
        showRendered,
        state: { c },
        setState,
        toggleShowRendered,
    } = useContext(MemoContext);

    return (
        <div
            style={{ ...commonStyle, flexDirection: "column", margin: 0 }}
            className={showRendered ? "rendered-component" : ""}
        >
            <div className="text" style={{ marginBottom: 24 }}>
                Component C (context)
            </div>
            <div>
                <button
                    style={{ ...buttonStyle, fontWeight: "normal" }}
                    onClick={() => setState("c", c + 1)}
                >
                    Update {c}
                </button>
                <button
                    style={{ ...buttonStyle, fontWeight: showRendered ? "bold" : "normal" }}
                    onClick={toggleShowRendered}
                >
                    Highlight Rendered Components {showRendered ? "ON" : "OFF"}
                </button>
            </div>
            <ComponentD showRendered={showRendered} />
        </div>
    );
};
