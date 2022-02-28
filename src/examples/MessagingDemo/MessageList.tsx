import { LoadingSpinner } from "components/LoadingSpinner";
import { FakeMessenger } from "examples/MessagingDemo/FakeMessenger";
import { MessageLine } from "examples/MessagingDemo/MessageLine";
import { MessagingSubscriberContext } from "examples/MessagingDemo/MessagingSubscriberContext";
import { createRef, memo, ReactElement, useEffect, useState } from "react";
import { useSubscribeDeep } from "react-subscribe-context/useSubscribeDeep";
import styled from "styled-components";

const MemoizedMessageLine = memo(MessageLine);

export const MessageList = (): ReactElement => {
    const bottomElement = createRef<HTMLDivElement>();
    const [state, setState] = useSubscribeDeep(MessagingSubscriberContext);
    const [isLoading, setIsLoading] = useState(false);
    const { selectedReceiverName, currentMessages } = state;
    const senderId = state.currentUser.id;

    useEffect(() => {
        const fetchMessages = async () => {
            setIsLoading(true);

            const messages = await FakeMessenger.getMessages(selectedReceiverName);

            setState({ currentMessages: messages });
            setIsLoading(false);
        };

        fetchMessages();
    }, [selectedReceiverName]);

    useEffect(() => {
        bottomElement.current?.scrollIntoView({ behavior: "smooth" });
    }, [state.currentMessages]);

    console.log("rendered message list");

    const messageElements = currentMessages.map((messageInfo) => {
        return (
            <MemoizedMessageLine
                key={messageInfo.id}
                messageInfo={messageInfo}
                isSender={senderId === messageInfo.senderId}
            />
        );
    });

    return (
        <StyledMessages>
            {isLoading ? <LoadingSpinner /> : messageElements}
            <div ref={bottomElement} />
        </StyledMessages>
    );
};

const StyledMessages = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    /* height: 320px; */
    overflow: scroll;
    flex: 1;
`;
