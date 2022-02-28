import { Conversation, FakeMessenger } from "examples/MessagingDemo/FakeMessenger";
import { MessagingSubscriberContext } from "examples/MessagingDemo/MessagingSubscriberContext";
import { memo, MouseEventHandler, ReactElement, useCallback, useEffect, useState } from "react";
import { useSubscribe } from "react-subscribe-context/useSubscribe";
import { useSubscribeDeep } from "react-subscribe-context/useSubscribeDeep";
import styled from "styled-components";

let old: any;

export const Conversations = (): ReactElement => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedReceiverName] = useSubscribe(MessagingSubscriberContext, "selectedReceiverName");
    const [state, setState] = useSubscribeDeep(MessagingSubscriberContext);

    const handleClickContact: React.MouseEventHandler<HTMLDivElement> = useCallback((e) => {
        const target = e.currentTarget as HTMLDivElement;

        setState({ selectedReceiverName: target.dataset["contactname"] });
    }, []);

    console.log(old, old === handleClickContact);

    old = handleClickContact;

    useEffect(() => {
        const fetchConversations = async () => {
            const data = await FakeMessenger.getConversations();

            setConversations(data);
        };

        fetchConversations();
    }, []);

    console.log("here, conversations", selectedReceiverName);

    return (
        <StyledContainer>
            <StyledHeader>Active Conversations ({conversations.length})</StyledHeader>
            <StyledConversations>
                {conversations.map(({ name, firstMessage }) => {
                    return (
                        <SomeComponent
                            key={name}
                            name={name}
                            className={selectedReceiverName === name ? "selected" : ""}
                            handleClickContact={handleClickContact}
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
    }: {
        name: string;
        // selectedReceiverName: string;
        className?: string;
        handleClickContact: MouseEventHandler<HTMLDivElement>;
    }) => {
        return (
            <StyledContact
                key={name}
                className={className}
                data-contactname={name}
                onClick={handleClickContact}
            >
                <StyledContactName>{name}</StyledContactName>
            </StyledContact>
        );
    }
);

const StyledContactName = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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
