import { logRender } from "utils/logRender";
import { useTracked } from "./ReactTrackContext";

export const Counter = () => {
    const [state, setState] = useTracked();

    const increment = () => {
        setState((prev) => ({
            ...prev,
            count: prev.count + 1,
        }));
    };
    logRender("Counter");

    return (
        <div style={{ margin: 12 }}>
            <div>Count: {state.count}</div>
            <div>Hmmm: {state.text}</div>
            <button type="button" onClick={increment}>
                +1
            </button>
        </div>
    );
};
