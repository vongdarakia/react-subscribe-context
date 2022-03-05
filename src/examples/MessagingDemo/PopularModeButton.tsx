import { FakeMessenger } from "examples/MessagingDemo/FakeMessenger";
import { ReactElement, useState } from "react";
import styled from "styled-components";

export const PopularModeButton = (): ReactElement => {
    const [isSimulating, setIsSimulating] = useState(false);

    const startPopularMode = async () => {
        setIsSimulating(true);

        await FakeMessenger.simulatePopularMode("Akia Vongdara");

        setIsSimulating(false);
    };

    return (
        <StyledButton onClick={startPopularMode} disabled={isSimulating}>
            Popular Mode
        </StyledButton>
    );
};

const StyledButton = styled.button`
    padding: 12px;
`;
