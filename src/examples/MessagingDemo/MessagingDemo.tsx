import { Conversations } from "examples/MessagingDemo/Conversations";
import { MessageHeader } from "examples/MessagingDemo/MessageHeader";
import { MessageInput } from "examples/MessagingDemo/MessageInput";
import { MessageList } from "examples/MessagingDemo/MessageList";
import { MessagingSubscriberProvider } from "examples/MessagingDemo/MessagingSubscriberContext";
import { ReactElement } from "react";
import styled from "styled-components";

export const MessagingDemo = (): ReactElement => {
    return (
        <StyledAppContainer>
            <MessagingSubscriberProvider>
                <StyledContainer>
                    <StyledConversationsSection>
                        <Conversations />
                    </StyledConversationsSection>
                    <StyledMessengerBody>
                        <MessageHeader />
                        <StyledMessengerWindow>
                            <MessageList />
                            <MessageInput />
                        </StyledMessengerWindow>
                    </StyledMessengerBody>
                </StyledContainer>
            </MessagingSubscriberProvider>
            <StyledFooter>
                Designed inspired by{" "}
                <a
                    href="https://dribbble.com/shots/13625389/attachments/5230015?mode=media"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    Emy Lascan
                </a>
            </StyledFooter>
        </StyledAppContainer>
    );
};

const StyledFooter = styled.div`
    color: whitesmoke;
    padding: 12px;

    a {
        color: whitesmoke;

        &:visited {
            color: whitesmoke;
        }
    }
`;

const StyledAppContainer = styled.div`
    height: 450px;
    max-width: 720px;
    margin: auto;
`;

const StyledContainer = styled.div`
    display: flex;
    gap: 24px;
    height: 100%;
    padding: 32px;
    background: white;
    border-radius: 12px;
`;

const StyledMessengerBody = styled.div`
    flex: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const StyledMessengerWindow = styled.div`
    background-color: #f3f6fb;
    padding: 24px;
    border-radius: 12px;
    flex: 1;
    /* height: fit-content; */
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

const StyledConversationsSection = styled.div`
    /* gap: 24px; */
    /* background-color: #f3f6fb; */
    /* padding: 24px;
    border-radius: 12px; */
    width: 33%;
    max-width: 280px;
    min-width: 200px;
`;
