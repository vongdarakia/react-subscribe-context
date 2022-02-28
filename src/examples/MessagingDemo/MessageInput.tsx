import { FakeMessenger } from "examples/MessagingDemo/FakeMessenger";
import { MessagingSubscriberContext } from "examples/MessagingDemo/MessagingSubscriberContext";
import { createRef, KeyboardEventHandler, ReactElement, useContext } from "react";
import styled from "styled-components";

export const MessageInput = (): ReactElement => {
    // const [text, setMessage] = useState("");
    const inputRef = createRef<HTMLInputElement>();
    const { getValue, setValue } = useContext(MessagingSubscriberContext);

    const handleClickSend = async () => {
        if (inputRef.current && inputRef.current.value) {
            const messageInfo = await FakeMessenger.sendMessage({
                senderId: getValue("currentUser").id,
                receiverId: getValue("selectedReceiverName"),
                text: inputRef.current.value,
            });

            setValue("currentMessages", [...getValue("currentMessages"), messageInfo]);
            // setMessage("");
            inputRef.current.value = "";
        }
    };

    // const handleChangeMessage: ChangeEventHandler<HTMLInputElement> = (e) => {
    //     if (inputRef.current) {
    //         setMessage(e.target.value);
    //     }
    // };

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
                // onChange={handleChangeMessage}
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
