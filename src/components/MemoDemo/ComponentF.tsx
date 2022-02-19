import { ReactElement, useContext } from "react";
import { BasicContext } from "../../contexts/BasicContext";
import { commonStyle } from "../../utils/common-styles";

export const ComponentF = (): ReactElement => {
    const {
        state: { f },
        setState,
    } = useContext(BasicContext);

    return (
        <div style={{ ...commonStyle, background: "purple" }}>
            <button onClick={() => setState("f", f + 1)}>{f}</button>
        </div>
    );
};
