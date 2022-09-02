import React from "react";
//import socketIO from "socket.io-client";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Join from "./component/Join/Join";
import Chat from "./component/Chat/Chat";

//const ENDPOINT = "http://localhost:4000";
//const socket = socketIO(ENDPOINT, { transports: ["WebSocket"] });
function App() {
  //socket.on("connnect", () => {});
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Join />} />
          <Route exact path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
