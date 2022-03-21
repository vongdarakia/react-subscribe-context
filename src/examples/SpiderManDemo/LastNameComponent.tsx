// LastNameComponent.tsx
import { ReactElement } from "react";
import { useSubscribe } from "react-subscribe-context";
import { SpiderManContext } from "./SpiderManContext";

export const LastNameComponent = (): ReactElement => {
    const [state] = useSubscribe(SpiderManContext);
    const {
        user: {
            name: { last },
        },
    } = state;

    return <div>{last}</div>;
};
