import { PerformanceOptionsProvider } from "components/PerformanceOptions/PerformanceOptionsProvider";
import { AdvancedDemo } from "examples/AdvancedDemo/AdvancedDemo";
import { ADVANCED_COLOR } from "examples/AdvancedDemo/colors";
import { BasicDemo } from "examples/BasicDemo/BasicDemo";
import { BASIC_COLOR } from "examples/BasicDemo/colors";
import { DeepSubscriberDemo } from "examples/DeepSubscriberDemo/DeepSubscriberDemo";
import { MessagingDemo } from "examples/MessagingDemo/MessagingDemo";
import { ReactTrackDemo } from "examples/ReactTrackDemo/ReactTrackDemo";
import { SUBSCRIBER_COLOR } from "examples/SubscriberDemo/colors";
import { SubscriberDemo } from "examples/SubscriberDemo/SubscriberDemo";
import React, { useState } from "react";
import styled from "styled-components";
import "./App.css";
import { Style } from "./types/common-types";

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
    const apps = [
        "Basic Context",
        // "Memo Demo",
        "Advanced Context",
        "Subscriber Context",
        "Deep Subscriber Demo",
        "Tracked Demo",
        "Messenger Demo",
    ] as const;
    const [selectedAppName, setApp] = useState<typeof apps[number]>("Messenger Demo");

    let app;

    switch (selectedAppName) {
        case "Basic Context":
            app = <BasicDemo />;
            break;
        // case "Memo Demo":
        //     app = <MemoDemo />;
        //     break;
        case "Messenger Demo":
            app = <MessagingDemo />;
            break;
        case "Subscriber Context":
            app = <SubscriberDemo />;
            break;
        case "Advanced Context":
            app = <AdvancedDemo />;
            break;
        case "Tracked Demo":
            app = <ReactTrackDemo />;
            break;
        case "Deep Subscriber Demo":
            app = <DeepSubscriberDemo />;
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
                    <AppContainer className={selectedAppName.replaceAll(" ", "_")}>
                        {app}
                    </AppContainer>
                </PerformanceOptionsProvider>
            </main>
        </div>
    );
}

const AppContainer = styled.div<{ appName?: string }>`
    padding: 32px;
    border: 1px solid white;

    &.Messenger_Demo {
        /* border-radius: 12px; */
        border: none;
        padding: 0;
        /* background: white; */
        /* height: 450px;
        max-width: 720px;
        margin: auto; */
    }
`;

export default App;
