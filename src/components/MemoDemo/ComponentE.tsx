import { ReactElement, useContext } from "react";
import { BasicContext } from "../../contexts/BasicContext";
import { commonStyle } from "../../utils/common-styles";

export const ComponentE = (): ReactElement => {
    const {
        state: { e },
        setState,
    } = useContext(BasicContext);

    return (
        <div style={{ ...commonStyle, background: "blue" }}>
            <button onClick={() => setState("e", e + 1)}>{e}</button>
        </div>
    );
};
