import { ReactElement, useContext, useState } from "react";
import styled from "styled-components";
import { logColor } from "utils/logColor";
import { logRender } from "utils/logRender";
import { Input } from "../../Input";
import { NumElementsInput } from "../SubscriberDemo/NumElementsInput";
import { PERFORMANCE_OPTIONS_COLOR } from "./colors";
import { PerformanceOptionsContext } from "./PerformanceOptionsContext";

const StyledInputContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-direction: row;
    gap: 16px;
    margin-bottom: 32px;
`;

const StyledFormGroup = styled("div")`
    display: flex;
    flex-direction: column;
    color: white;
    width: 300px;

    label {
        text-align: left;
        font-weight: 600;
        margin-bottom: 8px;
    }
`;

const StyledButton = styled.button`
    padding: 12px;
    cursor: pointer;

    &.on {
        font-weight: bold;
    }
`;

const StyledContainer = styled.div`
    width: fit-content;
    margin: auto;
`;

export const PerformanceOptions = (): ReactElement => {
    const { state, setState } = useContext(PerformanceOptionsContext);
    const [inputValue, setInputValue] = useState("");
    const currentNumElements = state.numElements;

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputValue(e.target.value);
        setState(state);
    };

    const onClickDisplayNumElements = (nextNumElements: number) => {
        setState({ numElements: nextNumElements });
    };

    const handleToggleUseMemo = () => {
        setState({ shouldUseMemo: !state.shouldUseMemo });
    };

    logRender("%cPerformanceOptions", logColor(PERFORMANCE_OPTIONS_COLOR));

    return (
        <StyledContainer>
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
            <StyledInputContainer>
                <StyledButton
                    onClick={handleToggleUseMemo}
                    className={state.shouldUseMemo ? "on" : "off"}
                >
                    Memo {state.shouldUseMemo ? "ON" : "OFF"}
                </StyledButton>
            </StyledInputContainer>
        </StyledContainer>
    );
};
