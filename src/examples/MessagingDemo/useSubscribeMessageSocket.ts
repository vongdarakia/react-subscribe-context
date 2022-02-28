import { EVT_MESSAGE_FROM_FRIEND, EVT_MESSAGE_TO_FRIEND } from "constants/event-names";
import { FakeMessenger } from "examples/MessagingDemo/FakeMessenger";
import { MessageInfo } from "examples/MessagingDemo/types";
import { useEffect } from "react";

interface SubscribeMessageSocket {
    (event: typeof EVT_MESSAGE_FROM_FRIEND, eventHandler: (messageInfo: MessageInfo) => void): void;
    (event: typeof EVT_MESSAGE_TO_FRIEND, eventHandler: (messageInfo: MessageInfo) => void): void;
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
