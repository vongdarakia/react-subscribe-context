import { ReactElement, useContext } from "react";
import { BasicContext } from "../../contexts/BasicContext";
import { commonStyle } from "../../utils/common-styles";
import { ComponentB } from "./ComponentB";
import { ComponentC } from "./ComponentC";

export const ComponentA = (): ReactElement => {
    const {
        state: { a },
        setState,
    } = useContext(BasicContext);

    return (
        <div style={{ ...commonStyle, flexDirection: "column", borderWidth: 2 }}>
            <button onClick={() => setState("a", a + 1)}>{a}</button>
            <div style={{ ...commonStyle, border: "none" }}>
                <ComponentB />
                <ComponentC />
            </div>
        </div>
    );
};
