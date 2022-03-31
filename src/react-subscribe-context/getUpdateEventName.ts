import { EventKey } from ".";

export const getUpdateEventName = (key: string): EventKey => {
    return `update-${key}`;
};
