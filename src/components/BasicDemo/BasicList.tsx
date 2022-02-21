import { memo, ReactElement, useContext, useEffect } from "react";
import { Style } from "../../types/common-types";
import { PerformanceOptionsContext } from "../PerformanceOptions/PerformanceOptionsContext";
import { BasicContext } from "./BasicContext";
import { BasicItem } from "./BasicItem";

const style: Style = {
    display: "block",
    maxWidth: "100%",
};

const MemoizedBasicItem = memo(BasicItem);

export const BasicList = (): ReactElement => {
    const { setState, setValue, ...state } = useContext(BasicContext);
    const {
        state: { numElements, shouldUseMemo },
    } = useContext(PerformanceOptionsContext);
    const keys = Object.keys(state) as (keyof typeof state)[];

    useEffect(() => {
        const newState: typeof state = {};

        for (let i = 0; i < numElements; i++) {
            newState[`basic-item-${i}`] = i % 100;
        }

        setState(newState);
    }, [numElements]);

    return (
        <div style={style}>
            {keys.map((key) =>
                shouldUseMemo ? (
                    <MemoizedBasicItem key={key} itemKey={key} />
                ) : (
                    <BasicItem key={key} itemKey={key} />
                )
            )}
        </div>
    );
};
