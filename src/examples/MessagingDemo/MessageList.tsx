import { MessageLine } from "examples/MessagingDemo/MessageLine";
import { MessagingSubscriberContext } from "examples/MessagingDemo/MessagingSubscriberContext";
import { memo, ReactElement, useEffect, useRef } from "react";
import { useSubscribeDeep } from "react-subscribe-context/useSubscribeDeep";
import styled from "styled-components";

const MemoizedMessageLine = memo(MessageLine);

export const MessageList = (): ReactElement => {
    const bottomElement = useRef<HTMLDivElement | null>(null);
    const [state] = useSubscribeDeep(MessagingSubscriberContext);
    const senderId = state.currentUser.id;

    useEffect(() => {
        bottomElement.current?.scrollIntoView({ behavior: "smooth" });
    }, [state.currentMessages]);

    return (
        <StyledMessages>
            {state.currentMessages.map((messageInfo) => {
                return (
                    <MemoizedMessageLine
                        key={messageInfo.id}
                        messageInfo={messageInfo}
                        isSender={senderId === messageInfo.senderId}
                    />
                );
            })}
            <div ref={(ref) => (bottomElement.current = ref)} />
        </StyledMessages>
    );
};

const StyledMessages = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    /* height: 320px; */
    overflow: scroll;
    flex: 1;
`;
