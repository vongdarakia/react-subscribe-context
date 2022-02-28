import { ReactElement } from "react";
import styled from "styled-components";
import { DeepSubscriberProvider } from "./DeepSubscriberContext";
import { NameInput } from "./UserForm/NameInput";
import { UserPreview } from "./UserPreview";

const StyledContainer = styled.div`
    display: flex;
    color: whitesmoke;
`;

export const DeepSubscriberDemo = (): ReactElement => {
    return (
        <DeepSubscriberProvider>
            <StyledContainer>
                <div style={{ flex: 1 }}>
                    <NameInput />
                </div>
                <div style={{ flex: 1 }}>
                    <UserPreview />
                </div>
            </StyledContainer>
        </DeepSubscriberProvider>
    );
};
