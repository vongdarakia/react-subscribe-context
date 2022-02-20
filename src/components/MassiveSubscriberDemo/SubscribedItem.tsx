import React, { ReactElement, useEffect } from "react";
import { Style } from "../../types/common-types";
import { getIncrementedCharValue } from "../../utils/getIncrementedCharValue";
import { getIncrementedNumValue } from "../../utils/getIncrementedNumValue";
import { Button } from "../Button";
import {
    MassiveSubscriberContext,
    MassiveSubscriberKey,
    MassiveSubscriberState,
    NumberValueKey,
} from "./MassiveSubscriberContext";

const containerStyle: Style = {
    padding: 2,
    margin: 2,
    display: "inline-block",
    flex: 1,
};

const isNumProp = (itemKey: MassiveSubscriberKey): itemKey is NumberValueKey => {
    return itemKey.indexOf("-num-") > 0;
};

const getIncrementedValue = <
    TKey extends MassiveSubscriberKey,
    TValue extends MassiveSubscriberState[TKey]
>(
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

export const SubscribedItem = ({ itemKey }: { itemKey: MassiveSubscriberKey }): ReactElement => {
    const [value, setValue] = MassiveSubscriberContext.useSubscribe(itemKey);

    useEffect(() => {
        console.log("mounted", itemKey);
    }, []);

    console.log("render SubscribedItem");

    return (
        <div style={containerStyle}>
            <Button onClick={() => setValue(getIncrementedValue(itemKey, value))}>{value}</Button>
            {/* <Button>0</Button> */}
        </div>
    );
};
