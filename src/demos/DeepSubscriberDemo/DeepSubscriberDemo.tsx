import { SUBSCRIBER_COLOR } from "demos/SubscriberDemo/colors";
import { ReactElement } from "react";
import styled from "styled-components";
import { logColor } from "utils/logColor";
import { logRender } from "utils/logRender";
import { DeepSubscriberProvider } from "./DeepSubscriberContext";
import { NameInput } from "./UserForm/NameInput";
import { UserPreview } from "./UserPreview";

const StyledContainer = styled.div`
    display: flex;
    color: whitesmoke;
`;

export const DeepSubscriberDemo = (): ReactElement => {
    logRender("%cDeepSubscriberProvider", logColor(SUBSCRIBER_COLOR));

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
