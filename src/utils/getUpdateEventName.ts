import { EventKey } from "../react-subscribe-context";

export const getUpdateEventName = (key: string): EventKey => {
    return `update-${key}`;
};
