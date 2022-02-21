import { ReactElement } from "react";
import { PerformanceOptions } from "../PerformanceOptions/PerformanceOptions";
import { SubscriberContext } from "./SubscriberContext";
import { SubscriberList } from "./SubscriberList";

export const SubscriberDemo = (): ReactElement => {
    return (
        <SubscriberContext.Provider>
            <>
                <PerformanceOptions />
                <SubscriberList />
            </>
        </SubscriberContext.Provider>
    );
};
