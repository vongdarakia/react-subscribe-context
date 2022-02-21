import { ReactElement, useContext } from "react";
import { BasicContext } from "../../contexts/BasicContext";
import { commonStyle } from "../../utils/common-styles";

export const ComponentD = (): ReactElement => {
    const {
        state: { d },
        setState,
    } = useContext(BasicContext);

    return (
        <div style={{ ...commonStyle }}>
            <button onClick={() => setState("d", d + 1)}>{d}</button>
        </div>
    );
};
