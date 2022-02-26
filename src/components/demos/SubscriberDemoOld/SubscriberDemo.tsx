import { ReactElement } from "react";
import { BasicControlContext } from "../../../contexts/BasicControlContext";
import { BasicControlComponent } from "./BasicControlComponent";

export const SubscriberDemo = (): ReactElement => {
    return (
        <BasicControlContext.Provider>
            <BasicControlComponent />
        </BasicControlContext.Provider>
    );
};
