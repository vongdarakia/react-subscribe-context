import { Button } from "components/Button";
import { Style } from "definitions/common-types";
import React, { ReactElement, useEffect } from "react";
import { useSubscribe } from "react-subscribe-context/useSubscribe";
import { getIncrementedCharValue } from "utils/getIncrementedCharValue";
import { getIncrementedNumValue } from "utils/getIncrementedNumValue";
import { logColor } from "utils/logColor";
import { logRender } from "utils/logRender";
import { SUBSCRIBER_COLOR, SUBSCRIBER_COLOR_LIGHT } from "./colors";
import { SubscriberContext, SubscriberKey } from "./SubscriberContext";

const containerStyle: Style = {
    padding: 2,
    margin: 2,
    display: "inline-block",
    flex: 1,
};

export const SubscribedItem = ({ itemKey }: { itemKey: SubscriberKey }): ReactElement => {
    const [value, setValue] = useSubscribe(SubscriberContext.Context, itemKey);

    const handleClick = () => {
        if (typeof value === "number") {
            setValue(getIncrementedNumValue(value));
        } else {
            setValue(getIncrementedCharValue(value));
        }
    };

    useEffect(() => {
        // console.log("mounted", itemKey);
    }, [itemKey]);

    logRender("%cSubscribedItem", logColor(SUBSCRIBER_COLOR_LIGHT));

    return (
        <div style={containerStyle}>
            <Button
                onClick={handleClick}
                backgroundColor={SUBSCRIBER_COLOR}
                hoverColor={SUBSCRIBER_COLOR_LIGHT}
            >
                {value}
            </Button>
        </div>
    );
};
