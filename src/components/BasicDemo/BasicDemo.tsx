import { ReactElement, useState } from "react";
import { Button } from "../Button";

export const BasicDemo = (): ReactElement => {
    const [counter, setCounter] = useState(0);

    return (
        <div>
            <Button onClick={() => setCounter(counter + 1)}>{counter}</Button>
        </div>
    );
};
