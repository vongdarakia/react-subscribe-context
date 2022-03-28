import { ReactElement } from "react";
import { useSubscribe } from "react-subscribe-context";
import styled from "styled-components";
import { SpiderManContext } from "./SpiderManContext";

export const MovieCounterComponent = (): ReactElement => {
    const {
        value: movieCounter,
        contextControl: { actions },
    } = useSubscribe(SpiderManContext, "movieCounter");

    const handleClickCounter = () => {
        actions.incrementMovieCounter();
    };

    return <StyledButton onClick={handleClickCounter}>{movieCounter}</StyledButton>;
};

const StyledButton = styled("button")`
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
`;
