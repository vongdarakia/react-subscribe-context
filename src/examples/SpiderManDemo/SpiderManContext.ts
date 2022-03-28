import { BaseContextControl } from "react-subscribe-context";
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

type State = typeof initialState;

const createActions = (contextControl: BaseContextControl<State>) => {
    const { setValue } = contextControl;

    return {
        incrementMovieCounter: () => {
            setValue("movieCounter", (movieCounter) => movieCounter + 1);
        },
    };
};

export const {
    Context: SpiderManContext,
    Provider: SpiderManProvider, // Note: This is not the same as what Context.Provider returns
} = createSubscriberContext({ initialState, createActions });
