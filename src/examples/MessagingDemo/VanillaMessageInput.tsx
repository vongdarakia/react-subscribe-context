import { EVT_MESSAGE_TO_FRIEND } from "constants/event-names";
import { FakeMessenger } from "examples/MessagingDemo/FakeMessenger";
import { VanillaMessagingContext } from "examples/MessagingDemo/VanillaMessagingContext";
import { createRef, KeyboardEventHandler, ReactElement, useContext } from "react";
import styled from "styled-components";

export const VanillaMessageInput = (): ReactElement => {
    const inputRef = createRef<HTMLInputElement>();
    const { currentUser, selectedReceiverName, currentMessages, setState } =
        useContext(VanillaMessagingContext);

    const handleClickSend = async () => {
        if (inputRef.current && inputRef.current.value) {
            const messageInfo = await FakeMessenger.sendMessage({
                senderName: currentUser.name,
                receiverName: selectedReceiverName,
                text: inputRef.current.value,
            });

            inputRef.current.value = "";

            const nextMessages = [...currentMessages, messageInfo];

            setState((prevState) => {
                return { ...prevState, currentMessages: nextMessages };
            });

            FakeMessenger.getEmitter().emit(EVT_MESSAGE_TO_FRIEND, messageInfo);
        }
    };

    const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === "Enter") {
            handleClickSend();
        }
    };

    return (
        <StyledMessageInput>
            <StyledInput
                ref={inputRef}
                placeholder="Enter your message here"
                onKeyPress={handleKeyPress}
            />
            <StyledButton onClick={handleClickSend}>Send</StyledButton>
        </StyledMessageInput>
    );
};

const StyledMessageInput = styled.div`
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0px 12px -6px #d4d4d4;
    display: flex;
    margin-top: 16px;
    padding: 12px;
    gap: 12px;
`;

const StyledInput = styled.input`
    border-radius: 4px;
    border: 1px solid #dcdde0;
    flex: 1;
    padding: 8px 12px;
`;

const StyledButton = styled.button`
    background-color: #004dfc;
    border: 0;
    border-radius: 6px;
    color: white;
    font-size: 12px;
    font-weight: 600;
    padding: 8px 12px;
`;
