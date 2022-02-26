import { createSubscriberContext } from "react-subscribe-context/createSubscriberContext";
import { getIncrementedCharValue } from "utils/getIncrementedCharValue";
import { getIncrementedNumValue } from "utils/getIncrementedNumValue";

export type NumberValueKey = `prop-num-${number}`;
export type StringValueKey = `prop-str-${number}`;
export type SubscriberKey = NumberValueKey | StringValueKey;

export const isNumberValueKey = (key: SubscriberKey): key is NumberValueKey => {
    return key.includes("prop-num-");
};

export const isStringValueKey = (key: SubscriberKey): key is StringValueKey => {
    return key.includes("prop-str-");
};

const defaultState: {
    [key: NumberValueKey]: number;
    [key: StringValueKey]: string;
    email?: string;
} = {};

export const NUM_SUBSCRIBED_ITEMS = 10;

let num = 0;
let char = "A";

for (let i = 0; i < NUM_SUBSCRIBED_ITEMS; i++) {
    if (i % 2 === 0) {
        defaultState[`prop-num-${i}`] = num;
        num = getIncrementedNumValue(num);
    } else {
        defaultState[`prop-str-${i}`] = char;
        char = getIncrementedCharValue(char);
    }
}

export type SubscriberState = typeof defaultState;

export const SubscriberContext = createSubscriberContext({ defaultState });
