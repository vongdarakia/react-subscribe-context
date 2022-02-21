import { ReactElement, useContext } from "react";
import { BasicContext } from "../../contexts/BasicContext";
import { commonStyle } from "../../utils/common-styles";
import { ComponentF } from "./ComponentF";
import { ComponentG } from "./ComponentG";

export const ComponentC = (): ReactElement => {
    const {
        state: { c },
        setState,
    } = useContext(BasicContext);

    return (
        <div style={{ ...commonStyle, flexDirection: "column" }}>
            <button onClick={() => setState("c", c + 1)}>{c}</button>
            <div style={{ ...commonStyle, border: "none" }}>
                <ComponentF />
                <ComponentG />
            </div>
        </div>
    );
};
