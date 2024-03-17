import "./main.less"
import React from "react"
import { getServerState, renderApp } from "pizi-react/src/utils/Utils"
import { App } from "./App.js"

// Extend window object definition
declare global {
    const io: any
}

// Get Socket.io
const socket = io('/pizi-server')
renderApp(<App serverState={getServerState()} socket={socket}/>)