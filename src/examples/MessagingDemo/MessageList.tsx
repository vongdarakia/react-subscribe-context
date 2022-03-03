import { LoadingSpinner } from "components/LoadingSpinner";
import { FakeMessenger } from "examples/MessagingDemo/FakeMessenger";
import { MessageLine } from "examples/MessagingDemo/MessageLine";
import { MessagingSubscriberContext } from "examples/MessagingDemo/MessagingSubscriberContext";
import { MessageInfo } from "examples/MessagingDemo/types";
import { useSubscribeMessageSocket } from "examples/MessagingDemo/useSubscribeMessageSocket";
import {
    createRef,
    memo,
    ReactElement,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useSubscribeDeep } from "react-subscribe-context/useSubscribeDeep";
import styled from "styled-components";

const MemoizedMessageLine = memo(MessageLine);

export const MessageList = (): ReactElement => {
    const bottomElement = createRef<HTMLDivElement>();
    const [state, setState] = useSubscribeDeep(MessagingSubscriberContext);
    const { getValue } = useContext(MessagingSubscriberContext);
    const [isLoading, setIsLoading] = useState(true);
    const { currentMessages, selectedReceiverName } = state;
    const conversationsLength = getValue("conversations").length;
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

            const messages = await FakeMessenger.getMessages(getValue("selectedReceiverName"));

            setState({ currentMessages: messages });
            setIsLoading(false);
        };

        if (getValue("conversations").length > 0) {
            fetchMessages();
        }
    }, [conversationsLength, selectedReceiverName, setState, getValue]);

    useEffect(() => {
        bottomElement.current?.scrollIntoView({ behavior: "smooth" });
    });

    useEffect(() => {
        bottomElement.current?.scrollIntoView();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    console.log("rendered message list", { currentMessages, isLoading, senderName });

    const messageElements = useMemo(
        () =>
            currentMessages.map((messageInfo) => {
                return (
                    <MemoizedMessageLine
                        key={messageInfo.id}
                        messageInfo={messageInfo}
                        isSender={senderName === messageInfo.senderName}
                    />
                );
            }),
        [senderName, currentMessages]
    );

    return (
        <StyledMessages isLoading={isLoading}>
            {isLoading || conversationsLength === 0 ? <LoadingSpinner /> : messageElements}
            <div ref={bottomElement} />
        </StyledMessages>
    );
};

const StyledMessages = styled.div<{ isLoading: boolean }>`
    display: flex;
    flex-direction: column;
    gap: ${({ isLoading }) => (isLoading ? "0px" : "8px")};
    overflow-y: scroll;
    flex: 1;
`;
