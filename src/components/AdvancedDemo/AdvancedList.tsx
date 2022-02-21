import { memo, MouseEvent, ReactElement, useContext, useEffect } from "react";
import { Style } from "../../types/common-types";
import { getIncrementedNumValue } from "../../utils/getIncrementedNumValue";
import { PerformanceOptionsContext } from "../PerformanceOptions/PerformanceOptionsContext";
import { AdvancedContext } from "./AdvancedContext";
import { AdvancedItem } from "./AdvancedItem";

const style: Style = {
    display: "block",
    maxWidth: "100%",
};

const MemoizedAdvancedItem = memo(AdvancedItem);

export const AdvancedList = (): ReactElement => {
    const { items, setState } = useContext(AdvancedContext);
    const {
        state: { numElements, shouldUseMemo },
    } = useContext(PerformanceOptionsContext);

    const handleItemClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target instanceof HTMLButtonElement) {
            const key = e.target.dataset["key"];

            setState({
                items: items.map((item) => {
                    if (item.id === key) {
                        const nextValue = getIncrementedNumValue(item.value);

                        console.log({ key, currentValue: item.value, nextValue });

                        return { ...item, value: nextValue };
                    }
                    return item;
                }),
            });
        }
    };

    useEffect(() => {
        const nextState = { items: [] as typeof items };

        for (let i = 0; i < numElements; i++) {
            nextState.items.push({ id: `advanced-item-${i}`, value: i % 100 });
        }

        setState(nextState);
    }, [numElements]);

    return (
        <div style={style} onClick={handleItemClick}>
            {items.map(({ id, value }) =>
                shouldUseMemo ? (
                    <MemoizedAdvancedItem key={id} itemKey={id} />
                ) : (
                    <AdvancedItem key={id} itemKey={id} />
                )
            )}
        </div>
    );
};
