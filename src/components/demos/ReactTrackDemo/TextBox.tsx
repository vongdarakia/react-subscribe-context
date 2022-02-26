import { getIncrementedCharValue } from "../../../utils/getIncrementedCharValue";
import { logRender } from "../../../utils/logRender";
import { useTracked } from "./ReactTrackContext";

export const TextBox = () => {
    const [state, setState] = useTracked();
    const increment = () => {
        setState((prev) => ({
            ...prev,
            text: getIncrementedCharValue(prev.text),
        }));
    };
    logRender("TextBox");

    return (
        <div style={{ margin: 12 }}>
            <div>Text: {state.text}</div>
            <button type="button" onClick={increment}>
                Change
            </button>
        </div>
    );
};
