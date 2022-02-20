import { ReactElement } from "react";
import { MassiveSubscriberContext } from "./MassiveSubscriberContext";
import { MassiveSubscriberList } from "./MassiveSubscriberList";

export const MassiveSubscriberDemo = (): ReactElement => {
    return (
        <MassiveSubscriberContext.Provider>
            <MassiveSubscriberList />
        </MassiveSubscriberContext.Provider>
    );
};
