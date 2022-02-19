import { memo, ReactElement, useContext, useState } from "react";
import { ControlContext } from "../../contexts/ControlContext";
import { Style } from "../../types/common-types";
import { DescriptionHolder } from "./DescriptionHolder";
import { NameHolder } from "./NameHolder";

const style: Style = {
    padding: 2,
    border: "1px solid white",
    width: 300,
};

export const GodComponent = memo((): ReactElement => {
    const { setValue } = useContext(ControlContext);
    const [something, setSomething] = useState(0);
    const [show, setShow] = useState(true);

    return (
        <div style={style}>
            {show && (
                <>
                    <DescriptionHolder />
                    <NameHolder />
                </>
            )}

            <button onClick={() => setSomething(something + 1)}>Render</button>
            <button onClick={() => setShow(!show)}>Toggle Show</button>
        </div>
    );
});
