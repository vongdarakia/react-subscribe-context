import { createSubscriberContext } from "react-subscribe-context/createSubscriberContext";

const initialState = {
    user: {
        name: {
            first: "Peter",
            last: "Parker",
        },
    },
    movieCounter: 9,
};

export const {
    Context: SpiderManContext,
    Provider: SpiderManProvider, // Note: This is not the same as what Context.Provider returns
} = createSubscriberContext({ initialState });
