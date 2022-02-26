import { Button } from "components/Button";
import { Style } from "definitions/common-types";
import React, { ReactElement, useEffect } from "react";
import { getIncrementedCharValue } from "utils/getIncrementedCharValue";
import { getIncrementedNumValue } from "utils/getIncrementedNumValue";
import { logColor } from "utils/logColor";
import { logRender } from "utils/logRender";
import { useSubscribeMany } from "../../react-subscribe-context/useSubscribeMany";
import { SUBSCRIBER_COLOR, SUBSCRIBER_COLOR_LIGHT } from "./colors";
import {
    isNumberValueKey,
    isStringValueKey,
    SubscriberContext,
    SubscriberKey,
    SubscriberState,
} from "./SubscriberContext";

const containerStyle: Style = {
    padding: 2,
    margin: 2,
    display: "inline-block",
    flex: 1,
};

export const SubscribedItem = ({ itemKey }: { itemKey: SubscriberKey }): ReactElement => {
    const [state, setState] = useSubscribeMany(SubscriberContext.Context);

    const handleClick = () => {
        const nextState: Partial<SubscriberState> = {};

        if (isNumberValueKey(itemKey)) {
            nextState[itemKey] = getIncrementedNumValue(state[itemKey]);
        } else if (isStringValueKey(itemKey)) {
            nextState[itemKey] = getIncrementedCharValue(state[itemKey]);
        }

        setState(nextState);
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
                {state[itemKey]}
            </Button>
        </div>
    );
};
