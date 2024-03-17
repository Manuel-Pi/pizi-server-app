import "./icons.js"
import React, { StrictMode } from 'react'
import { Home } from './screens/Home/Home.js'
import { Footer } from './components/Footer/Footer.js'
import { RestUI } from './screens/RestUI/RestUI.js'
import { IAppProps, MenuApp, PiziApp, PiziRoute, Token, createAppContext, isBrowser } from 'pizi-react'
import { Account } from './screens/Account/Account.js'
import { RestUIDetail } from './screens/RestUI/RestUIDetail.js'
import { Login } from './screens/Login/Login.js'
import { AppContext, IServerApi } from "./utils/Utils.js"

interface AppProps extends IAppProps<AppState, IServerApi>{
    socket?: any
}

type AppState = {
    token?: any
    user?: any
}

export class App extends PiziApp<AppProps, AppState, IServerApi> {

    static defaultMenuProps: any = {
        logo: <img src="/icon.png"></img>
    }

    static getRoutes(state: AppState = {}): PiziRoute[]{
        return [
            {
                title: "Home",
                path: "/",
                element: <Home/>,
                icon: "home",
                noMenu: !state.token
            },
            {
                path: "login",
                element: <Login/>,
                noMenu: true,
                hideInMenu: true
            },
            {
                title: "Account",
                path: "account",
                element: <Account/>,
                icon: "user",
                hideInMenu: !state.token,
                authenticate: true
            },{
                title: "Rest UI",
                path: "rest",
                element: <RestUI/>,
                icon: "plug",
                hideInMenu: !state.token,
                authenticate: true,
                children: [
                    {
                        path: ":collectionName",
                        element: <RestUIDetail/>,
                        hideInMenu: true,
                        authenticate: true
                    }
                ]
            }
        ]
    }

    async componentDidMount(){
        // Get token
        const token = this.state.token || await Token.getToken()
        if(!token) return
        this.setState({ token })

        // Set token to API and get user
        const api = this.props.api
        if(!api) return
        api.token = token.accessToken
        if(this.state.user || !api.users) return
        const user = await api.users.queries?.get(token.userId)
        this.setState({ user })
    }

    renderHead(){
        return <>
            <title>Pizi Server</title>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width"/>
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <link rel="stylesheet" type="text/css" href="/style.css"/>
            <link rel="apple-touch-icon" href="/icon.png"/>
            <link rel="icon" href="/icon.png"/>
            <script defer crossOrigin="anonymous" src="https://unpkg.com/react@19.0.0-canary-a73c3450e-20240329/umd/react.development.js"></script>
            <script defer crossOrigin="anonymous" src="https://unpkg.com/react-dom@19.0.0-canary-a73c3450e-20240329/umd/react-dom.development.js"></script> 
            <script defer src="/socket.io/socket.io.js"></script>
            <script defer src="/api/client.js"></script>
            <script defer src="/server-app.js"></script>
        </>
    }

    renderApp(){
        return  <StrictMode>
                    <AppContext.Provider value={AppContext.getContext({...this.state, api: this.props.api })}>
                        <MenuApp    {...App.defaultMenuProps}
                                    user={this.state.user?.username} 
                                    routes={this.props.routes || App.getRoutes(this.state)} 
                                    context={this.props.context}
                                    loginUrl="/api/app/login"/>
                    </AppContext.Provider>
                    <Footer/>
                </StrictMode>
    }
}