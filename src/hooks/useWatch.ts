import { useContext, useEffect, useState } from "react";
import { ControlContext, ControlStateField, IncomingState } from "../contexts/ControlContext";

export const useWatch = <Key extends ControlStateField>(fieldName: Key): IncomingState[Key] => {
    const { emitter, getValue } = useContext(ControlContext);
    const [value, setValue] = useState<IncomingState[Key]>(getValue(fieldName));

    const handleValueUpdated = (value: IncomingState[Key]) => {
        setValue(value);
    };

    useEffect(() => {
        console.log("useWatch", fieldName);
        emitter.on(`update-${fieldName}`, handleValueUpdated);

        return () => {
            console.log("unmounting emitter for ", `update-${fieldName}`);
            emitter.off(`update-${fieldName}`, handleValueUpdated);
        };
    }, []);

    return value;
};
