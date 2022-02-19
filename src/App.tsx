import React from "react";
import "./App.css";
import { SubscriberDemo } from "./components/SubscriberDemo/SubscriberDemo";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <SubscriberDemo />
                {/* <MemoDemo /> */}
            </header>
        </div>
    );
}

export default App;
