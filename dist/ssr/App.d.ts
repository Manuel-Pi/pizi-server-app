import "./icons.js";
import React from 'react';
import { IAppProps, PiziApp, PiziRoute } from 'pizi-react';
import { IServerAPI } from "./utils/Utils.js";
interface AppProps extends IAppProps {
    socket?: any;
    serverAPI?: IServerAPI;
}
type AppState = {
    token?: any;
    user?: any;
};
export declare class App extends PiziApp<AppProps, AppState> {
    constructor(props: AppProps);
    static defaultMenuProps: any;
    static getRoutes(state?: AppState): PiziRoute[];
    static getAppPropsFromServer(req: Request, options?: any): Promise<IAppProps>;
    static getExtraHead(): string[];
    componentDidMount(): Promise<void>;
    render(): React.JSX.Element;
}
export {};
