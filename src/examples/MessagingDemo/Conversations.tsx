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
            const copyPrevConversation = prevConversations.slice();
            const recentConversationIndex = prevConversations.findIndex(
                (c) => c.name === messageInfo.senderName
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

    useSubscribeMessageSocket("message-from-friend", handleIncomingMessage);
    useSubscribeMessageSocket("message-to-friend", handleOutgoingMessage);

    const handleClickContact: React.MouseEventHandler<HTMLDivElement> = useCallback(
        (e) => {
            const target = e.currentTarget as HTMLDivElement;

            setState({ selectedReceiverName: target.dataset["contactname"] });
        },
        [setState]
    );

    const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        const fetchConversations = async () => {
            const data = await FakeMessenger.getConversations();

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
                {filteredConversations.map(({ name, recentMessage }) => {
                    return (
                        <SomeComponent
                            key={name}
                            name={name}
                            className={selectedReceiverName === name ? "selected" : ""}
                            handleClickContact={handleClickContact}
                            recentText={recentMessage?.content}
                            isRecentMessageFromUser={recentMessage?.receiverName === name}
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
    }: {
        name: string;
        // selectedReceiverName: string;
        className?: string;
        handleClickContact: MouseEventHandler<HTMLDivElement>;
        recentText?: string;
        isRecentMessageFromUser: boolean;
    }) => {
        return (
            <StyledContact
                key={name}
                className={className}
                data-contactname={name}
                onClick={handleClickContact}
            >
                <StyledContactName>{name}</StyledContactName>
                {recentText && (
                    <StyledRecentName>{`${
                        isRecentMessageFromUser ? "You: " : ""
                    }${recentText}`}</StyledRecentName>
                )}
            </StyledContact>
        );
    }
);

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
    overflow: scroll;
`;

const StyledHeader = styled.div`
    text-align: left;
    font-weight: bold;
    padding: 12px 0;
`;
