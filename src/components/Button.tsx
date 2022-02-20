import { ReactElement } from "react";
import styled from "styled-components";

const StyledButton = styled("button")`
    padding: 8px;
    width: 40px;
    height: 40px;
    font-family: "Roboto Mono", monospace;
    font-weight: 600;
    background-color: #4f7cac;
    cursor: pointer;
    color: whitesmoke;
    border: 1px solid whitesmoke;
    border-radius: 4px;

    :hover {
        background-color: #7296bd;
    }
`;

export const Button = ({
    children,
    ...props
}: React.HTMLAttributes<HTMLButtonElement>): ReactElement => {
    return <StyledButton {...props}>{children}</StyledButton>;
};
