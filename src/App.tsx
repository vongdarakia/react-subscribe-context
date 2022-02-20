import React, { useState } from "react";
import "./App.css";
import { BasicDemo } from "./components/BasicDemo/BasicDemo";
import { MassiveSubscriberDemo } from "./components/MassiveSubscriberDemo/MassiveSubscriberDemo";
import { MemoDemo } from "./components/MemoDemo/MemoDemo";
import { SubscriberDemo } from "./components/SubscriberDemo/SubscriberDemo";
import { Style } from "./types/common-types";

const appsStyle: Style = {
    padding: 12,
    border: "1px solid white",
};

const buttonContainerStyle: Style = {
    marginTop: 12,
};

const buttonStyle: Style = {
    padding: 12,
    margin: 4,
};

function App() {
    const apps = ["Basic Context", "Memo", "Subscriber", "Massive Subscriber"] as const;
    const [selectedAppName, setApp] = useState<typeof apps[number]>("Memo");

    let app;

    switch (selectedAppName) {
        case "Basic Context":
            app = <BasicDemo />;
            break;
        case "Massive Subscriber":
            app = <MassiveSubscriberDemo />;
            break;
        case "Subscriber":
            app = <SubscriberDemo />;
            break;
        case "Memo":
            app = <MemoDemo />;
            break;
        default:
            app = <SubscriberDemo />;
    }

    return (
        <div className="App">
            <main>
                <div style={buttonContainerStyle}>
                    {apps.map((appName) => (
                        <button key={appName} style={buttonStyle} onClick={() => setApp(appName)}>
                            {appName}
                        </button>
                    ))}
                </div>
                <h2 style={{ color: "whitesmoke" }}>{selectedAppName}</h2>
                <div style={appsStyle}>{app}</div>
            </main>
        </div>
    );
}

export default App;
