import { ReactElement } from "react";
import { commonStyle } from "../../utils/common-styles";

export const ComponentD = ({ showRendered }: { showRendered: boolean }): ReactElement => {
    return (
        <div
            style={{ ...commonStyle, margin: 0 }}
            className={showRendered ? "rendered-component" : ""}
        >
            <div className="text" style={{ marginBottom: 24 }}>
                Component D
            </div>
        </div>
    );
};
