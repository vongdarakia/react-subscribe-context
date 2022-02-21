import { ReactElement } from "react";
import { PerformanceOptions } from "../PerformanceOptions/PerformanceOptions";
import { MassiveSubscriberContext } from "./MassiveSubscriberContext";
import { MassiveSubscriberList } from "./MassiveSubscriberList";

export const MassiveSubscriberDemo = (): ReactElement => {
    return (
        <MassiveSubscriberContext.Provider>
            <>
                <PerformanceOptions />
                <MassiveSubscriberList />
            </>
        </MassiveSubscriberContext.Provider>
    );
};
