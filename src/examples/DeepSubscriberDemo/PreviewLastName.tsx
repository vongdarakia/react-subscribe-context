import { ReactElement } from "react";
import { useSubscribeAll } from "react-subscribe-context/useSubscribeAll";
import { logRender } from "utils/logRender";
import { DeepSubscriberContext } from "./DeepSubscriberContext";

export const PreviewLastName = (): ReactElement => {
    const [user] = useSubscribeAll(DeepSubscriberContext, "user");

    logRender("lastName Preview");

    return <span>{user.name.last}</span>;
};
