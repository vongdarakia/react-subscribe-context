import { ReactElement } from "react";
import { useSubscribe } from "react-subscribe-context";
import { SpiderManContext } from "./SpiderManContext";

export const FirstNameComponent = (): ReactElement => {
    const [user] = useSubscribe(SpiderManContext, "user");
    const {
        name: { first },
    } = user;

    return <div>{first}</div>;
};
