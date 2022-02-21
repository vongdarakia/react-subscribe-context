import React, { useState } from "react";
import styled from "styled-components";
import "./App.css";
import { AdvancedDemo } from "./components/AdvancedDemo/AdvancedDemo";
import { ADVANCED_COLOR } from "./components/AdvancedDemo/colors";
import { BasicDemo } from "./components/BasicDemo/BasicDemo";
import { BASIC_COLOR } from "./components/BasicDemo/colors";
import { MemoDemo } from "./components/MemoDemo/MemoDemo";
import { PerformanceOptionsProvider } from "./components/PerformanceOptions/PerformanceOptionsProvider";
import { SUBSCRIBER_COLOR } from "./components/SubscriberDemo/colors";
import { SubscriberDemo } from "./components/SubscriberDemo/SubscriberDemo";
import { Style } from "./types/common-types";

const appsStyle: Style = {
    padding: 32,
    border: "1px solid white",
};

const buttonContainerStyle: Style = {
    marginTop: 12,
};

const buttonStyle: Style = {
    padding: 12,
    margin: 4,
};

const StyledButton = styled("button")`
    cursor: pointer;

    &.active {
        font-weight: bold;

        &.Basic_Context {
            color: ${BASIC_COLOR};
        }

        &.Advanced_Context {
            color: ${ADVANCED_COLOR};
        }

        &.Subscriber_Context {
            color: ${SUBSCRIBER_COLOR};
        }
    }
`;

function App() {
    const apps = ["Basic Context", "Memo Demo", "Advanced Context", "Subscriber Context"] as const;
    const [selectedAppName, setApp] = useState<typeof apps[number]>("Basic Context");

    let app;

    switch (selectedAppName) {
        case "Basic Context":
            app = <BasicDemo />;
            break;
        case "Memo Demo":
            app = <MemoDemo />;
            break;
        case "Subscriber Context":
            app = <SubscriberDemo />;
            break;
        case "Advanced Context":
            app = <AdvancedDemo />;
            break;
        default:
            app = <SubscriberDemo />;
    }

    return (
        <div className="App">
            <main>
                <div style={buttonContainerStyle}>
                    {apps.map((appName) => (
                        <StyledButton
                            key={appName}
                            style={buttonStyle}
                            onClick={() => setApp(appName)}
                            className={`${appName.replaceAll(" ", "_")} ${
                                appName === selectedAppName ? "active" : ""
                            }`}
                        >
                            {appName}
                        </StyledButton>
                    ))}
                </div>
                <h2 style={{ color: "whitesmoke" }}>{selectedAppName}</h2>
                <PerformanceOptionsProvider>
                    <div style={appsStyle}>{app}</div>
                </PerformanceOptionsProvider>
            </main>
        </div>
    );
}

export default App;
