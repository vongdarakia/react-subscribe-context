import { ReactElement } from "react";
import { useSubscribe } from "react-subscribe-context";
import styled from "styled-components";
import { SpiderManContext } from "./SpiderManContext";

export const MovieCounterComponent = (): ReactElement => {
    const [movieCounter, setMovieCounter] = useSubscribe(SpiderManContext, "movieCounter");

    const handleClickCounter = () => {
        setMovieCounter(movieCounter + 1);
    };

    return <StyledButton onClick={handleClickCounter}>{movieCounter}</StyledButton>;
};

const StyledButton = styled("button")`
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
`;
