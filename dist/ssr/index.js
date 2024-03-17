import "./main.less";
import React from "react";
import { getServerState, renderApp } from "pizi-react/src/utils/Utils";
import { App } from "./App.js";
// Get Socket.io
const socket = io('/pizi-server');
renderApp(React.createElement(App, { serverState: getServerState(), socket: socket }));
