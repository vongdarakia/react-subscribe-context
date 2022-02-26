import { ReactElement } from "react";
import { BasicControlContext } from "../../../contexts/BasicControlContext";

export const BasicControlComponent = (): ReactElement => {
    const [counter, setCounter] = BasicControlContext.useSubscribe("counter");

    return (
        <div>
            <button onClick={() => setCounter(counter + 1)}>{counter}</button>
        </div>
    );
};
