import { ReactElement } from "react";
import { useSubscribe } from "react-subscribe-context/useSubscribe";
import { logRender } from "utils/logRender";
import { DeepSubscriberContext } from "./DeepSubscriberContext";

export const PreviewLastName = (): ReactElement => {
    const [user] = useSubscribe(DeepSubscriberContext, "user");

    logRender("lastName Preview");

    return <span>{user.name.last}</span>;
};
