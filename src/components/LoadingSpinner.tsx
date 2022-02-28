import React from "react";
import styled from "styled-components";

export const LoadingSpinner = () => {
    return (
        <StyledContainer>
            <StyledSpinner />
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const SPINNER_SIZE = "20px";
const SPINNER_COLOR = "#004dfc";
const SPINNER_BORDER_SIZE = "2px";

const StyledSpinner = styled.div`
    position: relative;
    box-sizing: border-box;

    &::after {
        position: relative;
        box-sizing: border-box;
    }

    width: ${SPINNER_SIZE};
    height: ${SPINNER_SIZE};
    display: block;
    color: ${SPINNER_COLOR};

    &:after {
        content: "";
        width: 100%;
        height: 100%;
        display: inline-block;
        border: ${SPINNER_BORDER_SIZE} solid currentColor;
        border-bottom-color: transparent;
        border-radius: 100%;
        background: transparent;

        animation: ball-clip-rotate 0.75s linear infinite;
    }

    @keyframes ball-clip-rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
