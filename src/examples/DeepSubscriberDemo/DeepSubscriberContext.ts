import { createSubscriberContext } from "react-subscribe-context/createSubscriberContext";

type Email = `${string}@${string}.${string}`;

interface Name {
    first: string;
    last: string;
}

interface User {
    name: Name;
    email: Email;
    age: number;
}

const initialState: {
    user: User;
} = {
    user: {
        name: { first: "Jim", last: "Halpert" },
        email: "lkang@gmail.com",
        age: 24,
    },
};

export type DeepSubscriberState = typeof initialState;

export const [DeepSubscriberContext, DeepSubscriberProvider] = createSubscriberContext({
    initialState,
});
