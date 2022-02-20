import { ReactElement, useContext, useState } from "react";
import styled from "styled-components";
import { Style } from "../../types/common-types";
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

const StyledInput = styled("input")`
    margin-top: 8px;
    padding: 8px;
    font-size: 20px;
    width: 300px;
`;

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

    label {
        text-align: left;
        font-weight: 600;
    }
`;

export const MassiveSubscriberList = (): ReactElement => {
    const { state } = useContext(MassiveSubscriberContext.Context);
    const [inputValue, setInputValue] = useState("");
    const [numElements, setNumElements] = useState(NUM_SUBSCRIBED_ITEMS);
    const keys: MassiveSubscriberKey[] = [];

    // for (const key in state) {
    //     keys.push(key as MassiveSubscriberKey);
    // }

    for (let i = 0; i < numElements; i++) {
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

    const handleNumElementsChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setNumElements(Number.parseInt(e.target.value));
        const nextState: MassiveSubscriberState = {};

        for (let i = 0; i < numElements; i++) {
            const key: MassiveSubscriberKey = i % 2 === 0 ? `prop-num-${i}` : `prop-str-${i}`;

            if (state[key] === undefined) {
                //@ts-ignore
                nextState[key] = i % 2 === 0 ? 0 : "A";
            }
        }
    };

    return (
        <>
            <StyledInputContainer>
                <StyledFormGroup>
                    <label>Type to trigger render</label>
                    <StyledInput
                        value={inputValue}
                        placeholder="Type to test performance"
                        onChange={handleInputChange}
                    />
                </StyledFormGroup>
                <StyledFormGroup>
                    <label>Number of elements displayed</label>
                    <StyledInput
                        value={numElements}
                        placeholder="Number of elements"
                        onChange={handleNumElementsChange}
                        type="number"
                    />
                </StyledFormGroup>

                {/* <button onClick={updateAll}>Update All</button> */}
            </StyledInputContainer>
            <div style={style}>
                {keys.map((key) => (
                    <SubscribedItem key={key} itemKey={key} />
                ))}
            </div>
        </>
    );
};
