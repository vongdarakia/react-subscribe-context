import { memo, ReactElement, useContext } from "react";
import { ControlContext } from "../../contexts/ControlContext";
import { useWatch } from "../../hooks/useWatch";
import { Style } from "../../types/common-types";
import { getRandomName } from "../../utils/getRandomName";
import { AgeHolder } from "./AgeHolder";

const style: Style = {
    padding: 12,
    margin: "2px",
    textAlign: "left",
};

const descriptionStyle: Style = {
    marginTop: 8,
    fontSize: 16,
};

const buttonStyle: Style = {
    padding: "12px 16px",
    marginTop: 8,
    fontSize: 16,
    width: "100%",
    fontWeight: "bold",
    cursor: "pointer",
};

export const DescriptionHolder = memo((): ReactElement => {
    const { getValue, setValue } = useContext(ControlContext);
    const description = useWatch("description");

    const handleChangeDescription = () => {
        const name = getValue("name");
        let nextDescription = description;

        while (nextDescription === description) {
            nextDescription = `Wow... ${getRandomName(name)}`;
        }
        setValue("description", nextDescription);
    };

    return (
        <div style={style}>
            <div>Description:</div>
            <div style={descriptionStyle}>{description}</div>
            <button style={buttonStyle} onClick={handleChangeDescription}>
                Change description
            </button>

            <AgeHolder />
        </div>
    );
});
