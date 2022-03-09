import { ReactElement } from "react";
import { useSubscribeAll } from "react-subscribe-context/useSubscribeAll";
import { logRender } from "utils/logRender";
import { DeepSubscriberContext } from "./DeepSubscriberContext";

export const PreviewFirstName = (): ReactElement => {
    const [state] = useSubscribeAll(DeepSubscriberContext);

    logRender("firstName Preview");

    return <span>{state.user.name.first}</span>;
};
