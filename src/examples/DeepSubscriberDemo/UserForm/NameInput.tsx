import { ReactElement } from "react";
import { FirstNameInput } from "./FirstNameInput";
import { LastNameInput } from "./LastNameInput";

export const NameInput = (): ReactElement => {
    return (
        <div style={{ display: "flex", textAlign: "left", flexDirection: "column", flex: 1 }}>
            <h2>Inputs</h2>
            <div style={{ display: "flex", gap: 24 }}>
                <FirstNameInput />
                <LastNameInput />
            </div>
        </div>
    );
};
