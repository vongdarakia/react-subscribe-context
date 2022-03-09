import { FakeMessenger } from "examples/MessagingDemo/FakeMessenger";
import { MessagingSubscriberContext } from "examples/MessagingDemo/MessagingSubscriberContext";
import { MessageInfo } from "examples/MessagingDemo/types";
import { useSubscribeMessageSocket } from "examples/MessagingDemo/useSubscribeMessageSocket";
import { useCallback, useContext, useEffect, useState } from "react";
import { useSubscribeAll } from "react-subscribe-context/useSubscribeAll";

export const useMessageHistory = () => {
    const [state, setState] = useSubscribeAll(MessagingSubscriberContext);
    const [isLoading, setIsLoading] = useState(true);
    const { getValue } = useContext(MessagingSubscriberContext);
    const { currentMessages, selectedReceiverName } = state;
    const numConversations = getValue("conversations").length;
    const senderName = state.currentUser.name;

    const handleIncomingMessage = useCallback(
        (messageInfo: MessageInfo) => {
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
    }, [numConversations, selectedReceiverName, setState, getValue]);

    return { isLoading, messages: currentMessages, numConversations, senderName };
};
