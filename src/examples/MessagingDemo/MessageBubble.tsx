import { ReactElement } from "react";
import styled from "styled-components";

interface Props {
    message: string;
    isSender: boolean;
}

export const MessageBubble = ({ message, isSender }: Props): ReactElement => {
    return (
        <StyledMessageBubble className={isSender ? "sender-bubble" : "receiver-bubble"}>
            {message}
        </StyledMessageBubble>
    );
};

const StyledMessageBubble = styled.div`
    border-radius: 12px;
    padding: 12px 16px;
    line-height: 1.5;
    max-width: 66%;
    text-align: left;

    &.sender-bubble {
        background-color: #1a233b;
        color: #e7e8ea;
    }

    &.receiver-bubble {
        background-color: #fff;
        box-shadow: 0px 4px 4px -2px #d4d4d4;
        color: #727a8c;
    }
`;
