import { Style } from "definitions/common-types";
import { memo, ReactElement, useContext } from "react";
import { getRandomName } from "utils/getRandomName";
import { ControlContext } from "../../../contexts/ControlContext";
import { useWatch } from "../../../hooks/useWatch";

const style: Style = {
    padding: 12,
    margin: "2px",
    textAlign: "left",
};

const buttonStyle: Style = {
    padding: "12px 16px",
    marginTop: 8,
    fontSize: 16,
    width: "100%",
    fontWeight: "bold",
    cursor: "pointer",
};

export const NameHolder = memo((): ReactElement => {
    const { setValue } = useContext(ControlContext);
    const name = useWatch("name");

    const handleClickButton = () => {
        setValue("name", getRandomName(name));
    };

    return (
        <div style={style}>
            <div>Name: {name}</div>
            <button style={buttonStyle} onClick={handleClickButton}>
                Change name
            </button>
        </div>
    );
});
