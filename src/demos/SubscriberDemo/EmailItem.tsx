import { ReactElement } from "react";
import { useSubscribeMany } from "../../react-subscribe-context/useSubscribeMany";
import { SubscriberContext } from "./SubscriberContext";

export const EmailItem = (): ReactElement => {
    const [state] = useSubscribeMany(SubscriberContext.Context);

    return (
        <div>
            <button>{state["prop-str-1"]}</button>
            <button>{state["prop-num-0"]}</button>
        </div>
    );
};
