import { Conversation, FakeMessenger } from "examples/MessagingDemo/FakeMessenger";
import { MessagingSubscriberContext } from "examples/MessagingDemo/MessagingSubscriberContext";
import { MessageInfo } from "examples/MessagingDemo/types";
import { useSubscribeMessageSocket } from "examples/MessagingDemo/useSubscribeMessageSocket";
import { ChangeEvent, useCallback, useContext, useEffect, useState } from "react";
import { useSubscribe } from "react-subscribe-context/useSubscribe";

export const useConversations = () => {
    const [search, setSearch] = useState("");
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedReceiverName] = useSubscribe(MessagingSubscriberContext, "selectedReceiverName");
    const { getValue, setState } = useContext(MessagingSubscriberContext);
    const lowercasedSearch = search.toLowerCase();
    const filteredConversations = search
        ? conversations.filter((conversation) =>
              conversation.name.toLowerCase().includes(lowercasedSearch)
          )
        : conversations;

    const handleIncomingMessage = useCallback((messageInfo: MessageInfo) => {
        setConversations((prevConversations) => {
            const copyPrevConversations = prevConversations.slice();
            const recentConversationIndex = prevConversations.findIndex(
                (c) => c.name === messageInfo.senderName
            );

            if (recentConversationIndex >= 0) {
                const isTalkingToSender =
                    getValue("selectedReceiverName") === messageInfo.senderName;
                const [recentConversation] = copyPrevConversations.splice(
                    recentConversationIndex,
                    1
                );
                const nextConversations: Conversation[] = [
                    {
                        ...recentConversation,
                        recentMessage: messageInfo,
                        numUnreadMessages:
                            recentConversation.numUnreadMessages + (isTalkingToSender ? 0 : 1),
                    },
                    ...copyPrevConversations,
                ];

                return nextConversations;
            }

            return prevConversations;
        });
    }, []);

    const handleOutgoingMessage = useCallback((messageInfo: MessageInfo) => {
        setConversations((prevConversations) => {
            const copyPrevConversation = prevConversations.slice();
            const recentConversationIndex = prevConversations.findIndex(
                (c) => c.name === messageInfo.receiverName
            );

            if (recentConversationIndex >= 0) {
                const [recentConversation] = copyPrevConversation.splice(
                    recentConversationIndex,
                    1
                );
                const nextConversations: Conversation[] = [
                    { ...recentConversation, recentMessage: messageInfo },
                    ...copyPrevConversation,
                ];

                return nextConversations;
            }

            return prevConversations;
        });
    }, []);

    const handleMessageRead = useCallback((messageRead: MessageInfo) => {
        // messageRead.receiverName
    }, []);

    useSubscribeMessageSocket("message-from-friend", handleIncomingMessage);
    useSubscribeMessageSocket("message-to-friend", handleOutgoingMessage);
    useSubscribeMessageSocket("message-read-by-friend", handleMessageRead);

    useEffect(() => {
        const fetchConversations = async () => {
            const data = await FakeMessenger.getConversations(getValue("currentUser").name);

            setState({ selectedReceiverName: data[0].name });
            setConversations(data);
        };

        fetchConversations();
    }, []);

    const handleClickContact: React.MouseEventHandler<HTMLDivElement> = useCallback(
        (e) => {
            const target = e.currentTarget as HTMLDivElement;
            const contactName = target.dataset["contactname"];

            if (!contactName) {
                throw new Error("Somehow conversation data-contactname doesn't exist on list item");
            }

            setState({ selectedReceiverName: contactName });

            (function readCurrentMessages() {
                setConversations((prevConversations) =>
                    prevConversations.map((conversation) => {
                        if (conversation.name === contactName) {
                            return { ...conversation, numUnreadMessages: 0 };
                        }
                        return conversation;
                    })
                );
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
        onClickContact: handleClickContact,
        search,
        selectedReceiverName,
    };
};
