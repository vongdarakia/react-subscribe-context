import React, { ReactElement, useContext, useEffect } from "react";
import { Style } from "../../types/common-types";
import { Button } from "../Button";
import { AdvancedContext } from "./AdvancedContext";
import { ADVANCED_COLOR, ADVANCED_COLOR_LIGHT } from "./colors";

const containerStyle: Style = {
    padding: 2,
    margin: 2,
    display: "inline-block",
    flex: 1,
};

export const AdvancedItem = ({ itemKey }: { itemKey: string; value?: number }): ReactElement => {
    const { items } = useContext(AdvancedContext);
    const item = items.find((item) => item.id === itemKey);

    useEffect(() => {
        console.log("mounted", itemKey);
    }, [itemKey]);

    console.log("render AdvancedItem");

    return (
        <div style={containerStyle}>
            <Button
                data-key={itemKey}
                backgroundColor={ADVANCED_COLOR}
                hoverColor={ADVANCED_COLOR_LIGHT}
            >
                {item ? item.value : "None"}
            </Button>
        </div>
    );
};
