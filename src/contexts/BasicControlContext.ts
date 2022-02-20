import { createControlContext } from "./createControlContext";

const defaultState = {
    counter: 0,
};

export const BasicControlContext = createControlContext({ defaultState });
