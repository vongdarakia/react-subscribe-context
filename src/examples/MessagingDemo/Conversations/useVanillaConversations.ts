import { Conversation, FakeMessenger } from "examples/MessagingDemo/FakeMessenger";
import { MessageInfo } from "examples/MessagingDemo/types";
import { useSubscribeMessageSocket } from "examples/MessagingDemo/useSubscribeMessageSocket";
import { VanillaMessagingContext } from "examples/MessagingDemo/VanillaMessagingContext";
import { ChangeEvent, useCallback, useContext, useEffect, useState } from "react";

export const useVanillaConversations = () => {
    const [search, setSearch] = useState("");
    const { conversations, currentUser, selectedReceiverName, setState } =
        useContext(VanillaMessagingContext);
    const lowercasedSearch = search.toLowerCase();
    const filteredConversations = search
        ? conversations.filter((conversation) =>
              conversation.name.toLowerCase().includes(lowercasedSearch)
          )
        : conversations;

    const handleIncomingMessage = useCallback(
        (messageInfo: MessageInfo) => {
            const prevConversations = conversations.slice();
            const recentConversationIndex = prevConversations.findIndex(
                (c) => c.name === messageInfo.senderName
            );

            if (recentConversationIndex >= 0) {
                const isTalkingToSender = selectedReceiverName === messageInfo.senderName;
                const [recentConversation] = prevConversations.splice(recentConversationIndex, 1);
                const nextConversations: Conversation[] = [
                    {
                        ...recentConversation,
                        recentMessage: messageInfo,
                        numUnreadMessages:
                            recentConversation.numUnreadMessages + (isTalkingToSender ? 0 : 1),
                    },
                    ...prevConversations,
                ];

                setState({ conversations: nextConversations });
            }
        },
        [setState, conversations, selectedReceiverName]
    );

    const handleOutgoingMessage = useCallback(
        (messageInfo: MessageInfo) => {
            const prevConversations = conversations.slice();
            const recentConversationIndex = prevConversations.findIndex(
                (c) => c.name === messageInfo.receiverName
            );

            if (recentConversationIndex >= 0) {
                const [recentConversation] = prevConversations.splice(recentConversationIndex, 1);
                const nextConversations: Conversation[] = [
                    { ...recentConversation, recentMessage: messageInfo },
                    ...prevConversations,
                ];

                setState({ conversations: nextConversations });
            }
        },
        [conversations, setState]
    );

    const handleMessageRead = useCallback((messageRead: MessageInfo) => {
        // messageRead.receiverName
    }, []);

    useSubscribeMessageSocket("message-from-friend", handleIncomingMessage);
    useSubscribeMessageSocket("message-to-friend", handleOutgoingMessage);
    useSubscribeMessageSocket("message-read-by-friend", handleMessageRead);

    useEffect(() => {
        const fetchConversations = async () => {
            const data = await FakeMessenger.getConversations(currentUser.name);

            setState({ conversations: data, selectedReceiverName: data[0].name });
        };

        fetchConversations();
    }, [currentUser, setState]);

    const handleClickConversation: React.MouseEventHandler<HTMLDivElement> = useCallback(
        (e) => {
            const target = e.currentTarget as HTMLDivElement;
            const contactName = target.dataset["contactname"];

            if (!contactName) {
                throw new Error("Somehow conversation data-contactname doesn't exist on list item");
            }

            (function readCurrentMessages() {
                setState(({ conversations: prevConversations, ...others }) => ({
                    ...others,
                    selectedReceiverName: contactName,
                    conversations: prevConversations.map((conversation) => {
                        if (conversation.name === contactName) {
                            return { ...conversation, numUnreadMessages: 0 };
                        }
                        return conversation;
                    }),
                }));
                FakeMessenger.userReadMessages(contactName);
            })();
        },
        [setState]
    );

    const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return {
        conversations: filteredConversations,
        onChangeSearch: handleChangeSearch,
        onClickConversation: handleClickConversation,
        search,
        selectedReceiverName,
    };
};
