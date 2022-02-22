import { ReactElement } from "react";
import { logColor } from "../../utils/logColor";
import { logRender } from "../../utils/logRender";
import { PerformanceOptions } from "../PerformanceOptions/PerformanceOptions";
import { SUBSCRIBER_COLOR } from "./colors";
import { SubscriberContext } from "./SubscriberContext";
import { SubscriberList } from "./SubscriberList";

export const SubscriberDemo = (): ReactElement => {
    logRender("%cSubscriberProvider", logColor(SUBSCRIBER_COLOR));

    return (
        <SubscriberContext.Provider>
            <PerformanceOptions />
            <SubscriberList />
        </SubscriberContext.Provider>
    );
};
