import { memo, ReactElement } from "react";
import { commonStyle } from "../../utils/common-styles";
import { ComponentD } from "./ComponentD";
import { ComponentE } from "./ComponentE";

export const ComponentB = memo((): ReactElement => {
    // const {
    //     state: { b },
    //     setState,
    // } = useContext(BasicContext);

    return (
        <div
            style={{
                ...commonStyle,
                flexDirection: "column",
                // background: "orange",
                borderWidth: 2,
            }}
        >
            {/* <button onClick={() => setState("b", b + 1)}>{b}</button> */}
            <div style={{ ...commonStyle, border: "none" }}>
                <ComponentD />
                <ComponentE />
            </div>
        </div>
    );
});
