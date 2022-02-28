import { MessageInfo, User } from "examples/MessagingDemo/types";
import { createSubscriberContext } from "react-subscribe-context/createSubscriberContext";

// const defaultReceiver: User = {
//     name: "Something something",
// };

const defaultMessages: MessageInfo[] = [
    {
        id: "some-id",
        senderName: "Thomas Edison",
        receiverName: "Akia Vongdara",
        content: "Hey there!",
        status: "delivered",
        dateSent: new Date().toISOString(),
    },
];

const defaultState = {
    currentMessages: defaultMessages,
    selectedReceiverName: "Thomas Edison",
    selectedLineId: "Some Id",
    currentUser: {
        id: "my-user-id",
        name: "Akia Vongdara",
    } as User,
};

// https://type.fit/api/quotes

export const { Context: MessagingSubscriberContext, Provider: MessagingSubscriberProvider } =
    createSubscriberContext({ defaultState });
