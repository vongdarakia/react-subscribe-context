import {
    EVT_MESSAGE_FROM_FRIEND,
    EVT_MESSAGE_READ_BY_FRIEND,
    EVT_MESSAGE_TO_FRIEND,
} from "constants/event-names";
import { FakeMessenger } from "examples/MessagingDemo/FakeMessenger";
import { MessageInfo } from "examples/MessagingDemo/types";
import { useEffect } from "react";

const messageEvents = [
    EVT_MESSAGE_FROM_FRIEND,
    EVT_MESSAGE_TO_FRIEND,
    EVT_MESSAGE_READ_BY_FRIEND,
] as const;

type MessageEvent = typeof messageEvents[number];

interface SubscribeMessageSocket {
    // (event: typeof EVT_MESSAGE_FROM_FRIEND, eventHandler: (messageInfo: MessageInfo) => void): void;
    // (event: typeof EVT_MESSAGE_TO_FRIEND, eventHandler: (messageInfo: MessageInfo) => void): void;
    (event: MessageEvent, eventHandler: (messageInfo: MessageInfo) => void): void;
}

export const useSubscribeMessageSocket: SubscribeMessageSocket = (event, eventHandler) => {
    const emitter = FakeMessenger.getEmitter();

    useEffect(() => {
        emitter.on(event, eventHandler);

        return () => {
            emitter.off(event, eventHandler);
        };
    }, [emitter, event, eventHandler]);
};
