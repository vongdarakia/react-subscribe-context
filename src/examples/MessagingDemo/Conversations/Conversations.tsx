import { ContactListItem } from "examples/MessagingDemo/Conversations/ContactListItem";
import { useConversations } from "examples/MessagingDemo/Conversations/useConversations";
import { memo, ReactElement } from "react";
import styled from "styled-components";

const MemoizedContactListItem = memo(ContactListItem);

export const Conversations = (): ReactElement => {
    const { conversations, onChangeSearch, onClickConversation, search, selectedReceiverName } =
        useConversations();

    return (
        <StyledContainer>
            <StyledInput placeholder="Search contacts" onChange={onChangeSearch} value={search} />
            <StyledHeader>Active Conversations ({conversations.length})</StyledHeader>
            <StyledConversations>
                {conversations.map(({ name, recentMessage, numUnreadMessages }) => {
                    return (
                        <MemoizedContactListItem
                            key={name}
                            name={name}
                            className={selectedReceiverName === name ? "selected" : ""}
                            handleClickConversation={onClickConversation}
                            recentText={recentMessage?.content}
                            isRecentMessageFromUser={recentMessage?.receiverName === name}
                            numUnreadMessages={numUnreadMessages}
                        />
                    );
                })}
            </StyledConversations>
        </StyledContainer>
    );
};

const StyledInput = styled.input`
    border-radius: 4px;
    border: 1px solid #dcdde0;
    padding: 8px 12px;
`;

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
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
