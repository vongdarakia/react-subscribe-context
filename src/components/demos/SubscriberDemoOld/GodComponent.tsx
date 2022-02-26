import { memo, ReactElement, useState } from "react";
import { Style } from "../../../types/common-types";
import { DescriptionHolder } from "./DescriptionHolder";
import { NameHolder } from "./NameHolder";

const style: Style = {
    padding: 2,
    border: "1px solid white",
    width: 300,
    minHeight: 350,
};

export const GodComponent = memo((): ReactElement => {
    const [something, setSomething] = useState(0);
    const [show, setShow] = useState(true);

    return (
        <div style={style}>
            <button onClick={() => setShow(!show)}>Toggle Show</button>
            <button onClick={() => setSomething(something + 1)}>Render</button>
            {show && (
                <>
                    <DescriptionHolder />
                    <NameHolder />
                </>
            )}
        </div>
    );
});
