import { MessagingSubscriberContext } from "examples/MessagingDemo/MessagingSubscriberContext";
import { ReactElement } from "react";
import { useSubscribe } from "react-subscribe-context/useSubscribe";
import styled from "styled-components";

export const MessageHeader = (): ReactElement => {
    const receiverName = useSubscribe(MessagingSubscriberContext, "selectedReceiverName");

    return <StyledHeader>{receiverName}</StyledHeader>;
};

const StyledHeader = styled.div`
    margin-bottom: 12px;
    text-align: left;
    font-weight: bold;
    font-size: 24px;
`;
