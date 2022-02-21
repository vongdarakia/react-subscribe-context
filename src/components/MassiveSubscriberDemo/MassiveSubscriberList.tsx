import { memo, ReactElement, useContext, useEffect } from "react";
import { Style } from "../../types/common-types";
import { getIncrementedCharValue } from "../../utils/getIncrementedCharValue";
import { getIncrementedNumValue } from "../../utils/getIncrementedNumValue";
import { PerformanceOptionsContext } from "../PerformanceOptions/PerformanceOptionsContext";
import {
    MassiveSubscriberContext,
    MassiveSubscriberKey,
    MassiveSubscriberState,
    NUM_SUBSCRIBED_ITEMS,
} from "./MassiveSubscriberContext";
import { SubscribedItem } from "./SubscribedItem";

const style: Style = {
    display: "block",
    maxWidth: "100%",
};

const MemoizedSubscribedItem = memo(SubscribedItem);

export const MassiveSubscriberList = memo((): ReactElement => {
    const { state, getValue, setState } = useContext(MassiveSubscriberContext.Context);
    const {
        state: { numElements, shouldUseMemo },
    } = useContext(PerformanceOptionsContext);
    const keys: MassiveSubscriberKey[] = [];

    for (let i = 0; i < numElements; i++) {
        keys.push(i % 2 === 0 ? `prop-num-${i}` : `prop-str-${i}`);
    }

    useEffect(() => {
        const nextState: MassiveSubscriberState = {};
        let num = 0;
        let char = "A";

        if (NUM_SUBSCRIBED_ITEMS % 2 === 0) {
            num = getValue(`prop-num-${NUM_SUBSCRIBED_ITEMS - 2}`);
            char = getValue(`prop-str-${NUM_SUBSCRIBED_ITEMS - 1}`);
        } else {
            num = getValue(`prop-num-${NUM_SUBSCRIBED_ITEMS - 1}`);
            char = getValue(`prop-str-${NUM_SUBSCRIBED_ITEMS - 2}`);
        }

        for (let i = NUM_SUBSCRIBED_ITEMS; i < numElements; i++) {
            if (i % 2 === 0) {
                num = getIncrementedNumValue(num);
                nextState[`prop-num-${i}`] = num;
            } else {
                char = getIncrementedCharValue(char);
                nextState[`prop-str-${i}`] = char;
            }
        }

        setState(nextState);
    }, [numElements, setState, state, getValue]);

    return (
        <>
            <div style={style}>
                {keys.map((key) =>
                    shouldUseMemo ? (
                        <MemoizedSubscribedItem key={key} itemKey={key} />
                    ) : (
                        <SubscribedItem key={key} itemKey={key} />
                    )
                )}
            </div>
        </>
    );
});
