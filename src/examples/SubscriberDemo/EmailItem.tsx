import { Button } from "components/Button";
import { PERFORMANCE_OPTIONS_COLOR } from "components/PerformanceOptions/colors";
import { ReactElement } from "react";
import { useSubscribeAll } from "react-subscribe-context/useSubscribeAll";
import { SubscriberContext } from "./SubscriberContext";

export const EmailItem = (): ReactElement => {
    const [state] = useSubscribeAll(SubscriberContext.Context);

    return (
        <div>
            <Button backgroundColor={PERFORMANCE_OPTIONS_COLOR} style={{ margin: 4 }}>
                {state["prop-str-1"]}
            </Button>
            <Button backgroundColor={PERFORMANCE_OPTIONS_COLOR} style={{ margin: 4 }}>
                {state["prop-num-0"]}
            </Button>
        </div>
    );
};
