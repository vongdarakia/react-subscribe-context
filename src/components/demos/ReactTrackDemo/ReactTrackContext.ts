import { useState } from "react";
import { createContainer } from "react-tracked";

const useValue = () =>
    useState({
        count: 0,
        text: "hello",
    });

export const { Provider, useTracked } = createContainer(useValue);
