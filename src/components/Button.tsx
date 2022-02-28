import { ReactChild, ReactChildren } from "react";
import styled from "styled-components";

export const Button = styled.button<{
    hoverColor?: string;
    backgroundColor?: string;
    children?: ReactChild | ReactChildren;
}>`
    padding: 8px;
    width: 40px;
    height: 40px;
    font-family: "Roboto Mono", monospace;
    font-weight: 600;
    background-color: ${(props) => props.backgroundColor};
    cursor: ${(props) => (props.onClick ? "pointer" : "initial")};
    color: whitesmoke;
    border: 1px solid whitesmoke;
    border-radius: 4px;

    :hover {
        background-color: ${(props) => props.hoverColor}; //#7296bd;
    }
`;
