import { ReactElement } from "react";
import { FirstNameInput } from "./FirstNameInput";
import { LastNameInput } from "./LastNameInput";

export const NameInput = (): ReactElement => {
    return (
        <div style={{ display: "flex", textAlign: "left", flexDirection: "column" }}>
            <h2>Inputs</h2>
            <div style={{ display: "flex" }}>
                <FirstNameInput />
                <LastNameInput />
            </div>
        </div>
    );
};
