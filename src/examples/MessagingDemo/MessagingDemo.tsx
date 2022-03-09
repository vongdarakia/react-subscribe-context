import { Conversations as MessageConversations } from "examples/MessagingDemo/Conversations";
import { VanillaConversations } from "examples/MessagingDemo/Conversations/VanillaConversations";
import { MessageHeader } from "examples/MessagingDemo/MessageHeader";
import { MessageHistory } from "examples/MessagingDemo/MessageHistory";
import { VanillaMessageHistory } from "examples/MessagingDemo/MessageHistory/VanillaMessageHistory";
import { MessageInput } from "examples/MessagingDemo/MessageInput";
import { MessagingSubscriberProvider } from "examples/MessagingDemo/MessagingSubscriberContext";
import { PopularModeButton } from "examples/MessagingDemo/PopularModeButton";
import { VanillaMessageHeader } from "examples/MessagingDemo/VanillaMessageHeader";
import { VanillaMessageInput } from "examples/MessagingDemo/VanillaMessageInput";
import { VanillaMessagingProvider } from "examples/MessagingDemo/VanillaMessagingContext";
import { ReactElement, useState } from "react";
import styled from "styled-components";

export const MessagingDemo = (): ReactElement => {
    const [isVanilla, setIsVanilla] = useState(false);
    let Provider = MessagingSubscriberProvider;
    let Header = MessageHeader;
    let History = MessageHistory;
    let Input = MessageInput;
    let Conversations = MessageConversations;

    if (isVanilla) {
        Provider = VanillaMessagingProvider;
        Header = VanillaMessageHeader;
        History = VanillaMessageHistory;
        Input = VanillaMessageInput;
        Conversations = VanillaConversations;
    }

    return (
        <StyledAppContainer>
            <PopularModeButton />
            <StyledButton
                onClick={() => {
                    setIsVanilla((val) => !val);
                }}
            >
                Vanilla Mode ({isVanilla ? "On" : "Off"})
            </StyledButton>
            <Provider>
                <StyledContainer>
                    <StyledConversationsSection>
                        <Conversations />
                    </StyledConversationsSection>
                    <StyledMessengerBody>
                        <Header />
                        <StyledMessengerWindow>
                            <History />
                            <Input />
                        </StyledMessengerWindow>
                    </StyledMessengerBody>
                </StyledContainer>
            </Provider>
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

const StyledButton = styled.button`
    padding: 12px;
`;

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
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

const StyledConversationsSection = styled.div`
    width: 33%;
    max-width: 280px;
    min-width: 200px;
`;
