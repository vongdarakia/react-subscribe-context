import { FakeMessenger } from "examples/MessagingDemo/FakeMessenger";
import { MessageInfo } from "examples/MessagingDemo/types";
import { useSubscribeMessageSocket } from "examples/MessagingDemo/useSubscribeMessageSocket";
import { VanillaMessagingContext } from "examples/MessagingDemo/VanillaMessagingContext";
import { useCallback, useContext, useEffect, useState } from "react";

export const useVanillaMessageHistory = () => {
    const { currentMessages, selectedReceiverName, conversations, currentUser, setState } =
        useContext(VanillaMessagingContext);
    const [isLoading, setIsLoading] = useState(true);
    const numConversations = conversations.length;
    const senderName = currentUser.name;

    const handleIncomingMessage = useCallback(
        (messageInfo: MessageInfo) => {
            if (messageInfo.senderName === selectedReceiverName) {
                setState((prevState) => {
                    return {
                        ...prevState,
                        currentMessages: [...prevState.currentMessages, messageInfo],
                    };
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

        if (numConversations > 0) {
            fetchMessages();
        }
    }, [numConversations, selectedReceiverName, setState]);

    return { isLoading, messages: currentMessages, numConversations, senderName };
};
