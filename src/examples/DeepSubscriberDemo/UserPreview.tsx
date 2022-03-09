import { ReactElement } from "react";
import styled from "styled-components";
import { PreviewFirstName } from "./PreviewFirstName";
import { PreviewLastName } from "./PreviewLastName";

const StyledContainer = styled.div`
    margin: 0 24px;
    color: whitesmoke;
    text-align: left;

    span {
        font-size: 24px;
        letter-spacing: 2px;
        margin-right: 8px;
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
