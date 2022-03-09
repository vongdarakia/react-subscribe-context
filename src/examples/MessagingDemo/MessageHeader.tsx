import { MessagingSubscriberContext } from "examples/MessagingDemo/MessagingSubscriberContext";
import { ReactElement } from "react";
import { useSubscribeAll } from "react-subscribe-context/useSubscribeAll";
import styled from "styled-components";

export const MessageHeader = (): ReactElement => {
    const [receiverName] = useSubscribeAll(MessagingSubscriberContext, "selectedReceiverName");

    return <StyledHeader>{receiverName}</StyledHeader>;
};

const StyledHeader = styled.div`
    margin-bottom: 12px;
    text-align: left;
    font-weight: bold;
    font-size: 24px;
`;
