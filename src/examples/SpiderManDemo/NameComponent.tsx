// NameComponent.tsx
import { FirstNameComponent } from "examples/SpiderManDemo/FirstNameComponent";
import { LastNameComponent } from "examples/SpiderManDemo/LastNameComponent";
import { ReactElement } from "react";
import { useSubscribe } from "react-subscribe-context";
import styled from "styled-components";
import { SpiderManContext } from "./SpiderManContext";

type Name = { first: string; last: string };

const spiderManNames: Name[] = [
    { first: "Peter", last: "Parker" },
    { first: "Peter", last: "Porker" },
    { first: "Peni", last: "Parker" },
    { first: "Miles", last: "Morales" },
];

const getRandomSpiderManName = (currentName: Name) => {
    let randomName: Name = spiderManNames[0];

    do {
        randomName = spiderManNames[Math.floor(Math.random() * spiderManNames.length)];
    } while (currentName.first === randomName.first && currentName.last === randomName.last);

    return randomName;
};

export const NameComponent = (): ReactElement => {
    const [, setContextState] = useSubscribe(SpiderManContext);

    const handleClickRandomizeName = () => {
        setContextState((prevState) => {
            let {
                user: { name },
            } = prevState;

            const randomSpiderManName = getRandomSpiderManName(name);

            return {
                ...prevState,
                user: {
                    ...prevState.user,
                    name: randomSpiderManName,
                },
            };
        });
    };

    return (
        <StyledName>
            <button onClick={handleClickRandomizeName}>Randomize name</button>
            <FirstNameComponent />
            <LastNameComponent />
        </StyledName>
    );
};

const StyledName = styled("div")`
    display: flex;
    gap: 8px;
    font-size: 24px;
    color: white;
    align-items: center;

    button {
        font-size: 16px;
        font-weight: bold;
        padding: 12px;
    }
`;
