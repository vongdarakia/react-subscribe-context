import { ReactElement } from "react";
import { logRender } from "utils/logRender";
import { useSubscribeDeep } from "../../../react-subscribe-context/useSubscribeDeep";
import { DeepSubscriberContext } from "./DeepSubscriberContext";

export const PreviewFirstName = (): ReactElement => {
    const [state] = useSubscribeDeep(DeepSubscriberContext);

    logRender("firstName Preview");

    return (
        <span>
            {state.user.name.first} {state.user.name.last}
        </span>
    );
};
