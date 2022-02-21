import React, { ReactElement, useEffect } from "react";
import { RENDER_COLOR } from "../../constants/colors";
import { Style } from "../../types/common-types";
import { getIncrementedCharValue } from "../../utils/getIncrementedCharValue";
import { getIncrementedNumValue } from "../../utils/getIncrementedNumValue";
import { logColor } from "../../utils/logColor";
import { Button } from "../Button";
import { SUBSCRIBER_COLOR, SUBSCRIBER_COLOR_LIGHT } from "./colors";
import {
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

const getIncrementedValue = <TKey extends SubscriberKey, TValue extends SubscriberState[TKey]>(
    itemKey: TKey,
    value: TValue
) => {
    if (isNumProp(itemKey) && typeof value === "number") {
        return getIncrementedNumValue(value);
    }

    if (typeof value === "string") {
        return getIncrementedCharValue(value);
    }

    return value;
};

export const SubscribedItem = ({ itemKey }: { itemKey: SubscriberKey }): ReactElement => {
    const [value, setValue] = SubscriberContext.useSubscribe(itemKey);

    const handleClick = () => {
        setValue(getIncrementedValue(itemKey, value));
    };

    useEffect(() => {
        console.log("mounted", itemKey);
    }, [itemKey]);

    console.log(
        "%crender %cSubscribedItem",
        logColor(RENDER_COLOR),
        logColor(SUBSCRIBER_COLOR_LIGHT)
    );

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
