import { createSubscriberContext } from "../react-subscribe-context/createSubscriberContext";

const defaultState = {
    counter: 0,
};

export const BasicControlContext = createSubscriberContext({ defaultState });
