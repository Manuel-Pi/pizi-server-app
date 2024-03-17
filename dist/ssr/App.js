import "./icons.js";
import React, { StrictMode } from 'react';
import { Home } from './screens/Home/Home.js';
import { Footer } from './components/Footer/Footer.js';
import { RestUI } from './screens/RestUI/RestUI.js';
import { MenuApp, PiziApp, REST, Token, TokenContext, isBrowser } from 'pizi-react';
import { Account } from './screens/Account/Account.js';
import { RestUIDetail } from './screens/RestUI/RestUIDetail.js';
import { Login } from './screens/Login/Login.js';
import { ClientContext, ServerContext } from "./utils/Utils.js";
export class App extends PiziApp {
    constructor(props) {
        super(props);
        this.state = props.serverState || {};
    }
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
                title: "Login",
                path: "/login",
                element: React.createElement(Login, { user: state.user }),
                icon: "user",
                noMenu: true,
                hideInMenu: true
            },
            {
                title: "Account",
                path: "/account",
                element: React.createElement(Account, { user: state.user }),
                icon: "user",
                hideInMenu: !state.token
            }, {
                title: "Rest UI",
                path: "/rest",
                element: React.createElement(RestUI, null),
                icon: "plug",
                hideInMenu: !state.token,
                children: [
                    {
                        title: "Rest UI",
                        path: ":collectionName",
                        element: React.createElement(RestUIDetail, null),
                        icon: "plug",
                        hideInMenu: true
                    }
                ]
            }
        ];
    }
    static async getAppPropsFromServer(req, options = {}) {
        return super.getAppPropsFromServer(req, options);
    }
    static getExtraHead() {
        return super.getExtraHead();
    }
    async componentDidMount() {
        if (this.state.token)
            return;
        const token = await Token.getToken();
        if (!token)
            return;
        this.setState({ token });
        const user = await REST.get('users', token.userId);
        this.setState({ user });
    }
    render() {
        return React.createElement(StrictMode, null,
            React.createElement(ServerContext.Provider, { value: this.props.serverAPI },
                React.createElement(TokenContext.Provider, { value: this.state.token },
                    React.createElement(ClientContext.Provider, { value: isBrowser() },
                        React.createElement(MenuApp, { ...App.defaultMenuProps, user: this.state.user?.username, routes: this.props.routes || App.getRoutes(this.state), context: this.props.context })))),
            React.createElement(Footer, null));
    }
}
