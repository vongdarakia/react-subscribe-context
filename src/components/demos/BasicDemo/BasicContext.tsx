import { createContext } from "react";

interface BasicContextState {
    setState: (nextState: { [key: `basic-prop-${number}`]: number }) => void;
    setValue: (key: `basic-prop-${number}`, value: number) => void;
    [key: `basic-prop-${number}`]: number;
}

export const basicContextState: BasicContextState = {
    setState: () => {},
    setValue: () => {},
};

export const BasicContext = createContext(basicContextState);
