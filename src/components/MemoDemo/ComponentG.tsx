import { ReactElement } from "react";
import { commonStyle } from "../../utils/common-styles";

export const ComponentG = (): ReactElement => {
    // const {
    //     state: { g },
    //     setState,
    // } = useContext(BasicContext);

    return (
        <div style={{ ...commonStyle }}>
            {/* <button onClick={() => setState("g", g + 1)}>{g}</button> */}
        </div>
    );
};
