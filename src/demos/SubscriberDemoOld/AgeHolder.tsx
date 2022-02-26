import { memo, ReactElement, useContext } from "react";
import { ControlContext } from "../../contexts/ControlContext";
import { useWatch } from "../../hooks/useWatch";

export const AgeHolder = memo((): ReactElement => {
    const { setValue } = useContext(ControlContext);
    const age = useWatch("age");

    const handleIncrementAge = () => {
        setValue("age", age + 1);
    };

    return (
        <div style={{ marginTop: 12, padding: "8px 0" }}>
            Age{" "}
            <button style={{ padding: "12px 20px", fontSize: 16 }} onClick={handleIncrementAge}>
                {age}
            </button>
        </div>
    );
});
