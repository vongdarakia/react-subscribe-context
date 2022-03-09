import { VanillaMessagingContext } from "examples/MessagingDemo/VanillaMessagingContext";
import { ReactElement, useContext } from "react";
import styled from "styled-components";

export const VanillaMessageHeader = (): ReactElement => {
    const { selectedReceiverName: receiverName } = useContext(VanillaMessagingContext);

    return <StyledHeader>{receiverName}</StyledHeader>;
};

const StyledHeader = styled.div`
    margin-bottom: 12px;
    text-align: left;
    font-weight: bold;
    font-size: 24px;
`;
