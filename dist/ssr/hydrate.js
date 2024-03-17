import "./main.less";
import "./icons.js";
import React from "react";
import ReactDOM from 'react-dom/client';
import { App } from "./App.js";
ReactDOM.hydrateRoot(document.getElementsByTagName("app")[0], React.createElement(App, null));
