import { Conversation } from "examples/MessagingDemo/FakeMessenger";
import { MessageInfo, User } from "examples/MessagingDemo/types";
import { createSubscriberContext } from "react-subscribe-context/createSubscriberContext";

// const defaultReceiver: User = {
//     name: "Something something",
// };

const defaultMessages: MessageInfo[] = [];

const initialState = {
    conversations: [] as Conversation[],
    currentMessages: defaultMessages,
    currentUser: {
        id: "my-user-id",
        name: "Akia Vongdara",
    } as User,
    selectedReceiverName: "",
};

export const { Context: MessagingSubscriberContext, Provider: MessagingSubscriberProvider } =
    createSubscriberContext({ initialState });
