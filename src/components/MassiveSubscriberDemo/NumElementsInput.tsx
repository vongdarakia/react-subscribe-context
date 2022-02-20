import { ReactElement, useState } from "react";
import styled from "styled-components";
import { Input } from "../Input";
import { NUM_SUBSCRIBED_ITEMS } from "./MassiveSubscriberContext";

const StyledInput = styled(Input)`
    margin-top: 0;
    flex: 1;
`;

export const NumElementsInput = ({
    currentNumElements,
    onClickDisplayNumElements,
}: {
    currentNumElements: number;
    onClickDisplayNumElements: (nextNumElements: number) => void;
}): ReactElement => {
    const [numElementsStr, setNumElementsStr] = useState(NUM_SUBSCRIBED_ITEMS.toString());
    const numElements = Number.parseInt(numElementsStr || "0");

    const handleNumElementsChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setNumElementsStr(e.target.value);
    };

    const handleClickDisplay = () => {
        onClickDisplayNumElements(numElements);
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === "Enter") {
            onClickDisplayNumElements(numElements);
        }
    };

    return (
        <>
            <label>Number of elements (current: {currentNumElements})</label>
            <div style={{ display: "flex" }}>
                <StyledInput
                    value={numElementsStr}
                    placeholder="Number of elements"
                    onChange={handleNumElementsChange}
                    type="number"
                    onKeyDown={handleKeyDown}
                />
                <button disabled={numElements === currentNumElements} onClick={handleClickDisplay}>
                    Display
                </button>
            </div>
        </>
    );
};
