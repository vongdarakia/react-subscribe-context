import { Conversation, FakeMessenger } from "examples/MessagingDemo/FakeMessenger";
import { MessagingSubscriberContext } from "examples/MessagingDemo/MessagingSubscriberContext";
import { MessageInfo } from "examples/MessagingDemo/types";
import { useSubscribeMessageSocket } from "examples/MessagingDemo/useSubscribeMessageSocket";
import {
    ChangeEvent,
    memo,
    MouseEventHandler,
    ReactElement,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { useSubscribe } from "react-subscribe-context/useSubscribe";
import { useSubscribeDeep } from "react-subscribe-context/useSubscribeDeep";
import styled from "styled-components";

export const Conversations = (): ReactElement => {
    const [search, setSearch] = useState("");
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedReceiverName] = useSubscribe(MessagingSubscriberContext, "selectedReceiverName");
    const { getValue } = useContext(MessagingSubscriberContext);
    const [, setState] = useSubscribeDeep(MessagingSubscriberContext);
    const lowercasedSearch = search.toLowerCase();
    const filteredConversations = search
        ? conversations.filter((conversation) =>
              conversation.name.toLowerCase().includes(lowercasedSearch)
          )
        : conversations;

    const handleIncomingMessage = useCallback((messageInfo: MessageInfo) => {
        // console.log("received?", messageInfo);

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

                // console.log("return next conversation", messageInfo);

                return nextConversations;
            }

            // console.log("return prev conversation");
            return prevConversations;
        });
    }, []);

    const handleOutgoingMessage = useCallback((messageInfo: MessageInfo) => {
        // console.log("sent?", messageInfo);
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

    useEffect(() => {
        const fetchConversations = async () => {
            const data = await FakeMessenger.getConversations(getValue("currentUser").name);

            setConversations(data);
        };

        fetchConversations();
    }, []);

    // console.log("here, conversations", selectedReceiverName, conversations);

    return (
        <StyledContainer>
            <StyledInput
                // ref={inputRef}
                placeholder="Search contacts"
                onChange={handleChangeSearch}
                value={search}
                // onKeyPress={handleKeyPress}
            />
            <StyledHeader>Active Conversations ({filteredConversations.length})</StyledHeader>
            <StyledConversations>
                {filteredConversations.map(({ name, recentMessage, numUnreadMessages }) => {
                    return (
                        <SomeComponent
                            key={name}
                            name={name}
                            className={selectedReceiverName === name ? "selected" : ""}
                            handleClickContact={handleClickContact}
                            recentText={recentMessage?.content}
                            isRecentMessageFromUser={recentMessage?.receiverName === name}
                            numUnreadMessages={numUnreadMessages}
                            // selectedReceiverName={selectedReceiverName}
                        />
                    );
                })}
            </StyledConversations>
        </StyledContainer>
    );
};

const SomeComponent = memo(
    ({
        name,
        handleClickContact,
        className,
        recentText,
        isRecentMessageFromUser,
        numUnreadMessages = 0,
    }: {
        name: string;
        // selectedReceiverName: string;
        className?: string;
        handleClickContact: MouseEventHandler<HTMLDivElement>;
        recentText?: string;
        isRecentMessageFromUser: boolean;
        numUnreadMessages?: number;
    }) => {
        return (
            <StyledContact
                key={name}
                className={className}
                data-contactname={name}
                onClick={handleClickContact}
            >
                <StyledContentContainer>
                    <StyledContactName>{name}</StyledContactName>
                    {recentText && (
                        <StyledRecentName>{`${
                            isRecentMessageFromUser ? "You: " : ""
                        }${recentText}`}</StyledRecentName>
                    )}
                </StyledContentContainer>
                {numUnreadMessages > 0 && (
                    <StyledBadgeContainer>
                        <StyledBadge>{numUnreadMessages}</StyledBadge>
                    </StyledBadgeContainer>
                )}
            </StyledContact>
        );
    }
);

const StyledBadgeContainer = styled.div`
    align-items: center;
    justify-content: flex-end;
    display: flex;
`;

const StyledBadge = styled.div`
    background-color: #ff5757;
    width: 24px;
    height: 24px;
    border-radius: 100%;
    /* text-align: center; */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
    color: white;
`;

const StyledContentContainer = styled.div`
    flex: 1;
    flex-direction: column;
    display: flex;
    width: 1%;
`;

const StyledInput = styled.input`
    border-radius: 4px;
    border: 1px solid #dcdde0;
    padding: 8px 12px;
`;

const StyledContactName = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

const StyledRecentName = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 12px;
    color: slategray;
    margin-top: 4px;
`;

const StyledContact = styled.div`
    padding: 16px 12px;
    border-radius: 12px;
    text-align: left;
    cursor: pointer;
    display: flex;

    &:hover {
        background-color: #f3f6fb;
    }

    &.selected {
        background-color: #f3f6fb;

        ${StyledContactName} {
            font-weight: bold;
        }
    }
`;

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* gap: 4px; */
    height: 100%;
`;

const StyledConversations = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1px;
    flex: 1;
    overflow-y: scroll;
`;

const StyledHeader = styled.div`
    text-align: left;
    font-weight: bold;
    padding: 12px 0;
`;
