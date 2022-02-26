import { memo, ReactElement, useContext, useEffect } from "react";
import styled from "styled-components";
import { Style } from "../../../types/common-types";
import { getIncrementedCharValue } from "../../../utils/getIncrementedCharValue";
import { getIncrementedNumValue } from "../../../utils/getIncrementedNumValue";
import { PerformanceOptionsContext } from "../PerformanceOptions/PerformanceOptionsContext";
import { EmailItem } from "./EmailItem";
import { SubscribedItem } from "./SubscribedItem";
import {
    NUM_SUBSCRIBED_ITEMS,
    SubscriberContext,
    SubscriberKey,
    SubscriberState,
} from "./SubscriberContext";

const style: Style = {
    display: "block",
    maxWidth: "100%",
};

const StyledButtonContainer = styled.div`
    padding: 16px;

    button {
        padding: 12px;
        margin: 0px 6px;
        cursor: pointer;
    }
`;

const MemoizedSubscribedItem = memo(SubscribedItem);

export const SubscriberList = (): ReactElement => {
    const { getValue, setState } = useContext(SubscriberContext.Context);
    const {
        state: { numElements, shouldUseMemo },
    } = useContext(PerformanceOptionsContext);
    const keys: SubscriberKey[] = [];

    for (let i = 0; i < numElements; i++) {
        keys.push(i % 2 === 0 ? `prop-num-${i}` : `prop-str-${i}`);
    }

    const handleClickUpdateStrings = () => {
        const nextState: Partial<SubscriberState> = {};

        for (let i = 1; i < numElements; i += 2) {
            nextState[`prop-str-${i}`] = getIncrementedCharValue(getValue(`prop-str-${i}`));
        }
        setState(nextState);
    };

    const handleClickUpdateNumbers = () => {
        const nextState: Partial<SubscriberState> = {};

        for (let i = 0; i < numElements; i += 2) {
            nextState[`prop-num-${i}`] = getIncrementedNumValue(getValue(`prop-num-${i}`));
        }
        setState(nextState);
    };

    useEffect(() => {
        const nextState: SubscriberState = {};
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
    }, [numElements, setState, getValue]);

    console.log("render subscriber list");

    return (
        <div>
            <StyledButtonContainer>
                <button onClick={handleClickUpdateStrings}>Update All Strings</button>
                <button onClick={handleClickUpdateNumbers}>Update All Numbers</button>
            </StyledButtonContainer>
            <EmailItem />
            <div style={style}>
                {keys.map((key) =>
                    shouldUseMemo ? (
                        <MemoizedSubscribedItem key={key} itemKey={key} />
                    ) : (
                        <SubscribedItem key={key} itemKey={key} />
                    )
                )}
            </div>
        </div>
    );
};
