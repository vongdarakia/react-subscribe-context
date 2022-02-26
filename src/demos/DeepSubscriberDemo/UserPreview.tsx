import { ReactElement } from "react";
import styled from "styled-components";
import { PreviewFirstName } from "./PreviewFirstName";
import { PreviewLastName } from "./PreviewLastName";

const StyledContainer = styled.div`
    padding: 24px;
    color: whitesmoke;

    span {
        font-size: 16px;
    }
`;

export const UserPreview = (): ReactElement => {
    return (
        <StyledContainer>
            <h2>Preview</h2>
            <PreviewFirstName /> <PreviewLastName />
        </StyledContainer>
    );
};
