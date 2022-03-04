import { LoadingSpinner } from "components/LoadingSpinner";
import { MessageLine } from "examples/MessagingDemo/MessageHistory/MessageLine";
import { useMessageHistory } from "examples/MessagingDemo/MessageHistory/useMessageHistory";
import { createRef, memo, ReactElement, useEffect, useMemo } from "react";
import styled from "styled-components";

const MemoizedMessageLine = memo(MessageLine);

export const MessageHistory = (): ReactElement => {
    const { isLoading, messages, numConversations, senderName } = useMessageHistory();
    const bottomElement = createRef<HTMLDivElement>();

    useEffect(() => {
        bottomElement.current?.scrollIntoView({ behavior: "smooth" });
    });

    useEffect(() => {
        bottomElement.current?.scrollIntoView();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    const messageElements = useMemo(
        () =>
            messages.map((messageInfo) => {
                return (
                    <MemoizedMessageLine
                        key={messageInfo.id}
                        messageInfo={messageInfo}
                        isSender={senderName === messageInfo.senderName}
                    />
                );
            }),
        [senderName, messages]
    );

    return (
        <StyledMessages isLoading={isLoading}>
            {isLoading || numConversations === 0 ? <LoadingSpinner /> : messageElements}
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
