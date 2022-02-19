import { ReactElement } from "react";
import { ControlProvider } from "./ControlProvider";
import { GodComponent } from "./GodComponent";

export const SubscriberDemo = (): ReactElement => {
    return (
        <ControlProvider>
            <GodComponent />
        </ControlProvider>
    );
};
