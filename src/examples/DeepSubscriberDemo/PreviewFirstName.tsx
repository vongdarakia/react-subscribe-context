import { ReactElement } from "react";
import { useSubscribe } from "react-subscribe-context/useSubscribe";
import { logRender } from "utils/logRender";
import { DeepSubscriberContext } from "./DeepSubscriberContext";

export const PreviewFirstName = (): ReactElement => {
    const [state] = useSubscribe(DeepSubscriberContext);

    logRender("firstName Preview");

    return <span>{state.user.name.first}</span>;
};
