import { memo, ReactElement } from "react";
import { commonStyle } from "../../utils/common-styles";
import { ComponentB } from "./ComponentB";

export const ComponentA = memo((): ReactElement => {
    // const {
    //     state: { a },
    //     setState,
    // } = useContext(BasicContext);

    return (
        <div style={{ ...commonStyle, flexDirection: "column", borderWidth: 1, margin: 0 }}>
            <div style={{ marginBottom: 24 }}>Component A (memoized)</div>
            {/* <button onClick={() => setState("a", a + 1)}>{a}</button> */}
            <ComponentB />
        </div>
    );
});
