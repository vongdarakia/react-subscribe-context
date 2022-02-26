import { ReactElement } from "react";
import { commonStyle } from "../../../utils/common-styles";
import { ComponentC } from "./ComponentC";

export const ComponentB = (): ReactElement => {
    return (
        <div
            style={{
                ...commonStyle,
                flexDirection: "column",
                borderWidth: 1,
                margin: 0,
            }}
        >
            <div style={{ marginBottom: 24 }}>Component B</div>
            <ComponentC />
        </div>
    );
};
