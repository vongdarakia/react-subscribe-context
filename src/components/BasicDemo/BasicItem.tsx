import { ReactElement, useContext, useEffect } from "react";
import { RENDER_COLOR } from "../../constants/colors";
import { Style } from "../../types/common-types";
import { getIncrementedNumValue } from "../../utils/getIncrementedNumValue";
import { logColor } from "../../utils/logColor";
import { Button } from "../Button";
import { BasicContext } from "./BasicContext";
import { BASIC_COLOR, BASIC_COLOR_LIGHT } from "./colors";

const containerStyle: Style = {
    padding: 2,
    margin: 2,
    display: "inline-block",
    flex: 1,
};

export const BasicItem = ({
    itemKey,
}: {
    itemKey: `basic-prop-${number}`;
    value?: number;
}): ReactElement => {
    const { setValue, ...props } = useContext(BasicContext);

    const handleClickButton = () => {
        setValue(itemKey, getIncrementedNumValue(props[itemKey]));
    };

    useEffect(() => {
        console.log("mounted", itemKey);
    }, [itemKey]);

    console.log("%crender %cBasicItem", logColor(RENDER_COLOR), logColor(BASIC_COLOR_LIGHT));

    return (
        <div style={containerStyle}>
            <Button
                onClick={handleClickButton}
                data-key={itemKey}
                backgroundColor={BASIC_COLOR}
                hoverColor={BASIC_COLOR_LIGHT}
            >
                {props[itemKey]}
            </Button>
        </div>
    );
};
