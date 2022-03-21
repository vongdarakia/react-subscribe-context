// App.tsx
import React, { ReactElement } from "react";
import styled from "styled-components";
import { MovieCounterComponent } from "./MovieCounterComponent";
import { NameComponent } from "./NameComponent";
import { SpiderManProvider } from "./SpiderManContext";

export const SpiderManDemo = (): ReactElement => {
    return (
        <SpiderManProvider>
            <StyledWrapper>
                <StyledComponentWrapper>
                    <div className="component-label">{"Name: "}</div>
                    <NameComponent />
                </StyledComponentWrapper>
                <StyledComponentWrapper>
                    <div className="component-label">{"Movie Counter: "}</div>
                    <MovieCounterComponent />
                </StyledComponentWrapper>
            </StyledWrapper>
        </SpiderManProvider>
    );
};

const StyledWrapper = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
`;

const StyledComponentWrapper = styled("div")`
    display: flex;
    gap: 12px;

    .component-label {
        width: 120px;
        color: white;
        text-align: right;
    }
`;
