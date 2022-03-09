import { PerformanceOptionsContext } from "components/PerformanceOptions/PerformanceOptionsContext";
import { Style } from "definitions/common-types";
import { memo, ReactElement, useContext, useEffect } from "react";
import { getIncrementedNumValue } from "utils/getIncrementedNumValue";
import { AdvancedContext } from "./AdvancedContext";
import { AdvancedItem } from "./AdvancedItem";

const style: Style = {
    display: "block",
    maxWidth: "100%",
};

const MemoizedAdvancedItem = memo(AdvancedItem);

export const AdvancedList = (): ReactElement => {
    const { setState, setValue, ...state } = useContext(AdvancedContext);
    const {
        state: { numElements, shouldUseMemo },
    } = useContext(PerformanceOptionsContext);
    const keys: (keyof typeof state)[] = [];

    for (let i = 0; i < numElements; i++) {
        keys.push(`advanced-prop-${i}`);
    }

    const handleClickButton: React.MouseEventHandler<HTMLDivElement> = (e) => {
        const target = e.target as unknown as HTMLButtonElement;

        if (target.dataset["key"]) {
            const key = target.dataset["key"] as keyof typeof state;

            setState({
                [key]: getIncrementedNumValue(state[key]),
            });
        }
    };

    useEffect(() => {
        const newState: typeof state = {};

        for (let i = 0; i < numElements; i++) {
            newState[`advanced-prop-${i}`] = getIncrementedNumValue(i - 1);
        }

        setState(newState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [numElements]);

    return (
        <div style={style} onClick={handleClickButton}>
            {keys.map((key) =>
                shouldUseMemo ? (
                    <MemoizedAdvancedItem key={key} itemKey={key} value={state[key]} />
                ) : (
                    <AdvancedItem key={key} itemKey={key} />
                )
            )}
        </div>
    );
};
