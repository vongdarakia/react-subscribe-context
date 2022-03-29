import { Conversation } from "examples/MessagingDemo/FakeMessenger";
import { MessageInfo, User } from "examples/MessagingDemo/types";
import { createContext, ReactElement, ReactNode, useCallback, useState } from "react";

interface SetState<TState> {
    (nextState: Partial<TState>): void | Promise<void>;
    (getState: (state: TState) => TState): void | Promise<void>;
}

interface State {
    conversations: Conversation[];
    currentMessages: MessageInfo[];
    currentUser: User;
    selectedReceiverName: string;
    setState: SetState<State>;
}

const initialState: State = {
    conversations: [] as Conversation[],
    currentMessages: [] as MessageInfo[],
    currentUser: {
        id: "my-user-id",
        name: "Akia Vongdara",
    } as User,
    selectedReceiverName: "",
    setState: () => {},
};

export const VanillaMessagingContext = createContext(initialState);

export const VanillaMessagingProvider = ({
    children,
}: {
    children: ReactElement | ReactElement[] | ReactNode;
}) => {
    const [state, setState] = useState<typeof initialState>(initialState);

    const updateState: SetState<State> = useCallback(async (nextState) => {
        if (typeof nextState === "function") {
            setState(nextState);
        } else {
            setState((state) => ({ ...state, ...nextState }));
        }
    }, []);

    return (
        <VanillaMessagingContext.Provider value={{ ...state, setState: updateState }}>
            {children}
        </VanillaMessagingContext.Provider>
    );
};
