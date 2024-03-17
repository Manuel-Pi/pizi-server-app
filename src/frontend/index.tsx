import "./main.less"
import React from "react"
import { getServerState, renderApp } from "pizi-react/src/utils/Utils"
import { App } from "./App.js"
import { IServerApi } from "./utils/Utils"

// Extend window object definition
declare global {
    const io: any
    const API: IServerApi
}

// Get Socket.io
const socket = io('/pizi-server')
renderApp(<App serverState={getServerState()} socket={socket} api={(window as any).API}/>)