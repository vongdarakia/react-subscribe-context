import { createContext } from "react";

interface BasicContextState {
    setState: (nextState: { [key: `basic-item-${number}`]: number }) => void;
    setValue: (key: `basic-item-${number}`, value: number) => void;
    [key: `basic-item-${number}`]: number;
}

export const basicContextState: BasicContextState = {
    setState: () => {},
    setValue: () => {},
};

export const BasicContext = createContext(basicContextState);
