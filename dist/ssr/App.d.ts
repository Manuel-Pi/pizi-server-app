import "./icons.js";
import React from 'react';
import { IAppProps, PiziApp, PiziRoute } from 'pizi-react';
import { IServerApi } from "./utils/Utils.js";
interface AppProps extends IAppProps<AppState, IServerApi> {
    socket?: any;
}
type AppState = {
    token?: any;
    user?: any;
};
export declare class App extends PiziApp<AppProps, AppState, IServerApi> {
    static defaultMenuProps: any;
    static getRoutes(state?: AppState): PiziRoute[];
    componentDidMount(): Promise<void>;
    renderHead(): React.JSX.Element;
    renderApp(): React.JSX.Element;
}
export {};
