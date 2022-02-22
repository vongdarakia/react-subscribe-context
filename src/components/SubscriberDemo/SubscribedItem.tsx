import React, { ReactElement, useEffect } from "react";
import { useSubscribeMany } from "../../react-subscribe-context/useSubscribeMany";
import { Style } from "../../types/common-types";
import { getIncrementedCharValue } from "../../utils/getIncrementedCharValue";
import { getIncrementedNumValue } from "../../utils/getIncrementedNumValue";
import { logColor } from "../../utils/logColor";
import { logRender } from "../../utils/logRender";
import { Button } from "../Button";
import { SUBSCRIBER_COLOR, SUBSCRIBER_COLOR_LIGHT } from "./colors";
import {
    isNumberValueKey,
    isStringValueKey,
    NumberValueKey,
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

const isNumProp = (itemKey: SubscriberKey): itemKey is NumberValueKey => {
    return itemKey.indexOf("-num-") > 0;
};

// const getIncrementedValue = <TKey extends SubscriberKey, TValue extends SubscriberState[TKey]>(
//     itemKey: TKey,
//     value: TValue
// ) => {
//     if (isNumberValueKey(itemKey)) {
//         return getIncrementedNumValue(value);
//     }

//     if (typeof value === "string") {
//         return getIncrementedCharValue(value);
//     }

//     return value;
// };

export const SubscribedItem = ({ itemKey }: { itemKey: SubscriberKey }): ReactElement => {
    const [state, setState] = useSubscribeMany(SubscriberContext.Context, itemKey);
    // const [value, setValue] = useSubscribe(SubscriberContext.Context, itemKey);

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
