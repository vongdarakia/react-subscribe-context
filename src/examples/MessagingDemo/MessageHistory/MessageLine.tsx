import { MessageBubble } from "examples/MessagingDemo/MessageHistory/MessageBubble";
import { MessageInfo } from "examples/MessagingDemo/types";
import { ReactElement } from "react";
import styled from "styled-components";

interface Props {
    isSender: boolean;
    messageInfo: MessageInfo;
}

export const MessageLine = ({ isSender, messageInfo }: Props): ReactElement => {
    return (
        <StyledMessageLine
            isSender={isSender}
            className={isSender ? "sender-line" : "receiver-line"}
        >
            <MessageBubble message={messageInfo.content} isSender={isSender} />
        </StyledMessageLine>
    );
};

const StyledMessageLine = styled.div<{ isSender?: boolean }>`
    display: flex;
    flex-direction: column;

    &.sender-line {
        align-items: flex-end;
    }

    &.receiver-line {
        align-items: flex-start;
    }
`;
