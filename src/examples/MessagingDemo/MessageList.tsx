import { LoadingSpinner } from "components/LoadingSpinner";
import { FakeMessenger } from "examples/MessagingDemo/FakeMessenger";
import { MessageLine } from "examples/MessagingDemo/MessageLine";
import { MessagingSubscriberContext } from "examples/MessagingDemo/MessagingSubscriberContext";
import { MessageInfo } from "examples/MessagingDemo/types";
import { useSubscribeMessageSocket } from "examples/MessagingDemo/useSubscribeMessageSocket";
import { createRef, memo, ReactElement, useCallback, useEffect, useState } from "react";
import { useSubscribeDeep } from "react-subscribe-context/useSubscribeDeep";
import styled from "styled-components";

const MemoizedMessageLine = memo(MessageLine);

export const MessageList = (): ReactElement => {
    const bottomElement = createRef<HTMLDivElement>();
    const [state, setState] = useSubscribeDeep(MessagingSubscriberContext);
    const [isLoading, setIsLoading] = useState(false);
    const { selectedReceiverName, currentMessages } = state;
    const senderName = state.currentUser.name;

    const handleIncomingMessage = useCallback(
        (messageInfo: MessageInfo) => {
            console.log({ messageInfo });
            if (messageInfo.senderName === selectedReceiverName) {
                setState((prevState) => {
                    return { currentMessages: [...prevState.currentMessages, messageInfo] };
                });
            }
        },
        [setState, selectedReceiverName]
    );

    useSubscribeMessageSocket("message-from-friend", handleIncomingMessage);

    useEffect(() => {
        const fetchMessages = async () => {
            setIsLoading(true);

            const messages = await FakeMessenger.getMessages(selectedReceiverName);

            setState({ currentMessages: messages });
            setIsLoading(false);
        };

        fetchMessages();
    }, [selectedReceiverName, setState]);

    useEffect(() => {
        bottomElement.current?.scrollIntoView({ behavior: "smooth" });
    });

    useEffect(() => {
        bottomElement.current?.scrollIntoView();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    console.log("rendered message list", currentMessages);

    const messageElements = currentMessages.map((messageInfo) => {
        return (
            <MemoizedMessageLine
                key={messageInfo.id}
                messageInfo={messageInfo}
                isSender={senderName === messageInfo.senderName}
            />
        );
    });

    return (
        <StyledMessages>
            {/* <LoadingSpinner /> */}
            {isLoading ? <LoadingSpinner /> : messageElements}
            <div ref={bottomElement} />
        </StyledMessages>
    );
};

const StyledMessages = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow-y: scroll;
    flex: 1;
`;
