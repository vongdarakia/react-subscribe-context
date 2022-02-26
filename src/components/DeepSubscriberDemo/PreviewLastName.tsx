import { ReactElement } from "react";
import { useSubscribeDeep } from "../../react-subscribe-context/useSubscribeDeep";
import { logRender } from "../../utils/logRender";
import { DeepSubscriberContext } from "./DeepSubscriberContext";

export const PreviewLastName = (): ReactElement => {
    const [state] = useSubscribeDeep(DeepSubscriberContext);

    logRender("lastName Preview");

    return <span>{state.user.name.last}</span>;
};
