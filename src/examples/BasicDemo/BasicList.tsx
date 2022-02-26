import { PerformanceOptionsContext } from "components/PerformanceOptions/PerformanceOptionsContext";
import { Style } from "definitions/common-types";
import { memo, ReactElement, useContext, useEffect } from "react";
import { getIncrementedNumValue } from "utils/getIncrementedNumValue";
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
    const keys: (keyof typeof state)[] = [];

    for (let i = 0; i < numElements; i++) {
        keys.push(`basic-prop-${i}`);
    }

    useEffect(() => {
        const newState: typeof state = {};

        for (let i = 0; i < numElements; i++) {
            newState[`basic-prop-${i}`] = getIncrementedNumValue(i - 1);
        }

        setState(newState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
