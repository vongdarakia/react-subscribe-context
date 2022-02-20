import { ReactElement, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Style } from "../../types/common-types";
import { getIncrementedCharValue } from "../../utils/getIncrementedCharValue";
import { getIncrementedNumValue } from "../../utils/getIncrementedNumValue";
import { Input } from "../Input";
import {
    MassiveSubscriberContext,
    MassiveSubscriberKey,
    MassiveSubscriberState,
    NUM_SUBSCRIBED_ITEMS,
} from "./MassiveSubscriberContext";
import { NumElementsInput } from "./NumElementsInput";
import { SubscribedItem } from "./SubscribedItem";

const style: Style = {
    display: "block",
    maxWidth: "100%",
};

const StyledInputContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledFormGroup = styled("div")`
    display: flex;
    flex-direction: column;
    color: white;
    margin: 12px 0;
    width: 300px;

    label {
        text-align: left;
        font-weight: 600;
        margin-bottom: 8px;
    }
`;

export const MassiveSubscriberList = (): ReactElement => {
    const { state, getValue, setState } = useContext(MassiveSubscriberContext.Context);
    const [inputValue, setInputValue] = useState("");
    const [currentNumElements, setCurrentNumElements] = useState(NUM_SUBSCRIBED_ITEMS);
    const keys: MassiveSubscriberKey[] = [];

    for (let i = 0; i < currentNumElements; i++) {
        keys.push(i % 2 === 0 ? `prop-num-${i}` : `prop-str-${i}`);
    }

    // const updateAll = () => {
    //     const nextState: typeof state = {};

    //     for (let i = 0; i < NUM_SUBSCRIBED_ITEMS; i++) {
    //         if (i % 2 === 0) {
    //             nextState[`prop-num-${i}`] = getIncrementedNumValue(getValue(`prop-num-${i}`));
    //         } else {
    //             nextState[`prop-str-${i}`] = getIncrementedCharValue(getValue(`prop-str-${i}`));
    //         }
    //     }

    //     setState(nextState);
    // };

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputValue(e.target.value);
    };

    const onClickDisplayNumElements = (nextNumElements: number) => {
        setCurrentNumElements(nextNumElements);
    };

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

        for (let i = NUM_SUBSCRIBED_ITEMS; i < currentNumElements; i++) {
            if (i % 2 === 0) {
                num = getIncrementedNumValue(num);
                nextState[`prop-num-${i}`] = num;
            } else {
                char = getIncrementedCharValue(char);
                nextState[`prop-str-${i}`] = char;
            }
        }

        setState(nextState);
    }, [currentNumElements, setState, state, getValue]);

    return (
        <>
            <StyledInputContainer>
                <StyledFormGroup>
                    <label>Type to trigger render</label>
                    <Input
                        value={inputValue}
                        placeholder="Type to test performance"
                        onChange={handleInputChange}
                    />
                </StyledFormGroup>
                <StyledFormGroup>
                    <NumElementsInput
                        currentNumElements={currentNumElements}
                        onClickDisplayNumElements={onClickDisplayNumElements}
                    />
                </StyledFormGroup>
            </StyledInputContainer>
            <div style={style}>
                {keys.map((key) => (
                    <SubscribedItem key={key} itemKey={key} />
                ))}
            </div>
        </>
    );
};
