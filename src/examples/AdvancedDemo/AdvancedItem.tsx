import { Button } from "components/Button";
import { Style } from "definitions/common-types";
import React, { ReactElement, useContext, useEffect } from "react";
import { logColor } from "utils/logColor";
import { logRender } from "utils/logRender";
import { AdvancedContext } from "./AdvancedContext";
import { ADVANCED_COLOR, ADVANCED_COLOR_LIGHT } from "./colors";

const containerStyle: Style = {
    padding: 2,
    margin: 2,
    display: "inline-block",
    flex: 1,
};

export const AdvancedItem = ({
    itemKey,
}: {
    itemKey: `advanced-prop-${number}`;
    value?: number;
}): ReactElement => {
    const { setValue, ...props } = useContext(AdvancedContext);

    const propVal = props[itemKey];

    useEffect(() => {
        console.log("mounted", itemKey);
    }, [itemKey]);

    logRender("%cAdvancedItem", logColor(ADVANCED_COLOR_LIGHT));

    return (
        <div style={containerStyle}>
            <Button
                data-key={itemKey}
                backgroundColor={ADVANCED_COLOR}
                hoverColor={ADVANCED_COLOR_LIGHT}
                onClick={() => {}}
            >
                {propVal !== undefined ? propVal : "None"}
            </Button>
        </div>
    );
};
