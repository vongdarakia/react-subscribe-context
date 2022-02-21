import { memo, ReactElement, useContext } from "react";
import { BasicContext } from "../../contexts/BasicContext";
import { commonStyle } from "../../utils/common-styles";

export const ComponentF = memo((): ReactElement => {
    const {
        state: { f },
        setState,
    } = useContext(BasicContext);

    return (
        <div style={{ ...commonStyle }}>
            <button onClick={() => setState("f", f + 1)}>F {f}</button>
        </div>
    );
});
