import { ReactElement } from "react";
import { FirstNameInput } from "./FirstNameInput";
import { LastNameInput } from "./LastNameInput";

export const NameInput = (): ReactElement => {
    return (
        <div>
            <FirstNameInput />
            <LastNameInput />
        </div>
    );
};
