import "./icons.js";
import React, { StrictMode } from 'react';
import { Home } from './screens/Home/Home.js';
import { Footer } from './components/Footer/Footer.js';
import { RestUI } from './screens/RestUI/RestUI.js';
import { MenuApp, PiziApp, Token } from 'pizi-react';
import { Account } from './screens/Account/Account.js';
import { RestUIDetail } from './screens/RestUI/RestUIDetail.js';
import { Login } from './screens/Login/Login.js';
import { AppContext } from "./utils/Utils.js";
export class App extends PiziApp {
    static defaultMenuProps = {
        logo: React.createElement("img", { src: "/icon.png" })
    };
    static getRoutes(state = {}) {
        return [
            {
                title: "Home",
                path: "/",
                element: React.createElement(Home, null),
                icon: "home",
                noMenu: !state.token
            },
            {
                path: "login",
                element: React.createElement(Login, null),
                noMenu: true,
                hideInMenu: true
            },
            {
                title: "Account",
                path: "account",
                element: React.createElement(Account, null),
                icon: "user",
                hideInMenu: !state.token,
                authenticate: true
            }, {
                title: "Rest UI",
                path: "rest",
                element: React.createElement(RestUI, null),
                icon: "plug",
                hideInMenu: !state.token,
                authenticate: true,
                children: [
                    {
                        path: ":collectionName",
                        element: React.createElement(RestUIDetail, null),
                        hideInMenu: true,
                        authenticate: true
                    }
                ]
            }
        ];
    }
    async componentDidMount() {
        // Get token
        const token = this.state.token || await Token.getToken();
        if (!token)
            return;
        this.setState({ token });
        // Set token to API and get user
        const api = this.props.api;
        if (!api)
            return;
        api.token = token.accessToken;
        if (this.state.user || !api.users)
            return;
        const user = await api.users.queries?.get(token.userId);
        this.setState({ user });
    }
    renderHead() {
        return React.createElement(React.Fragment, null,
            React.createElement("title", null, "Pizi Server"),
            React.createElement("meta", { charSet: "UTF-8" }),
            React.createElement("meta", { name: "viewport", content: "width=device-width" }),
            React.createElement("meta", { name: "apple-mobile-web-app-capable", content: "yes" }),
            React.createElement("link", { rel: "stylesheet", type: "text/css", href: "/style.css" }),
            React.createElement("link", { rel: "apple-touch-icon", href: "/icon.png" }),
            React.createElement("link", { rel: "icon", href: "/icon.png" }),
            React.createElement("script", { defer: true, crossOrigin: "anonymous", src: "https://unpkg.com/react@19.0.0-canary-a73c3450e-20240329/umd/react.development.js" }),
            React.createElement("script", { defer: true, crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@19.0.0-canary-a73c3450e-20240329/umd/react-dom.development.js" }),
            React.createElement("script", { defer: true, src: "/socket.io/socket.io.js" }),
            React.createElement("script", { defer: true, src: "/api/client.js" }),
            React.createElement("script", { defer: true, src: "/server-app.js" }));
    }
    renderApp() {
        return React.createElement(StrictMode, null,
            React.createElement(AppContext.Provider, { value: AppContext.getContext({ ...this.state, api: this.props.api }) },
                React.createElement(MenuApp, { ...App.defaultMenuProps, user: this.state.user?.username, routes: this.props.routes || App.getRoutes(this.state), context: this.props.context, loginUrl: "/api/app/login" })),
            React.createElement(Footer, null));
    }
}
