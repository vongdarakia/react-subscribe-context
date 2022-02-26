import { PerformanceOptions } from "components/PerformanceOptions/PerformanceOptions";
import { PerformanceOptionsContext } from "components/PerformanceOptions/PerformanceOptionsContext";
import { ReactElement, useContext } from "react";
import { logRender } from "utils/logRender";
import { Counter } from "./Counter";
import { Provider } from "./ReactTrackContext";
import { TextBox } from "./TextBox";

export const ReactTrackDemo = (): ReactElement => {
    logRender("ReactTrackedDemo");
    useContext(PerformanceOptionsContext);

    return (
        <Provider>
            <PerformanceOptions />
            <div style={{ color: "whitesmoke", padding: 8, border: "1px solid white" }}>
                <Counter />
                <TextBox />
            </div>
        </Provider>
    );
};
