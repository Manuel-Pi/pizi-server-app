import "./icons.js"
import React, { StrictMode } from 'react'
import { Home } from './screens/Home/Home.js'
import { Footer } from './components/Footer/Footer.js'
import { RestUI } from './screens/RestUI/RestUI.js'
import { IAppProps, MenuApp, PiziApp, PiziRoute, REST, Token, TokenContext, isBrowser } from 'pizi-react'
import { Account } from './screens/Account/Account.js'
import { RestUIDetail } from './screens/RestUI/RestUIDetail.js'
import { Login } from './screens/Login/Login.js'
import { ClientContext, IServerAPI, ServerContext } from "./utils/Utils.js"

interface AppProps extends IAppProps{
    socket?: any
    serverAPI?: IServerAPI
}

type AppState = {
    token?: any
    user?: any
}

export class App extends PiziApp<AppProps, AppState> {

    constructor(props: AppProps){
        super(props)
        this.state = props.serverState as AppState || {}
    }

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
                title: "Login",
                path: "/login",
                element: <Login user={state.user}/>,
                icon: "user",
                noMenu: true,
                hideInMenu: true
            },
            {
                title: "Account",
                path: "/account",
                element: <Account user={state.user}/>,
                icon: "user",
                hideInMenu: !state.token
            },{
                title: "Rest UI",
                path: "/rest",
                element: <RestUI/>,
                icon: "plug",
                hideInMenu: !state.token,
                children: [
                    {
                        title: "Rest UI",
                        path: ":collectionName",
                        element: <RestUIDetail/>,
                        icon: "plug",
                        hideInMenu: true
                    } as PiziRoute
                ]
            }
        ]
    }

    static async getAppPropsFromServer(req: Request, options: any = {}){
        return super.getAppPropsFromServer(req, options)
    }

    static getExtraHead(){
        return super.getExtraHead()
    }

    async componentDidMount(){   
        if(this.state.token) return 
        const token = await Token.getToken()
        if(!token) return
        this.setState({token})
        const user = await REST.get('users', token.userId)
        this.setState({user})
    }

    render(){
        return  <StrictMode>
                    <ServerContext.Provider value={this.props.serverAPI}>
                        <TokenContext.Provider value={this.state.token}>
                            <ClientContext.Provider value={isBrowser()}>
                                <MenuApp    {...App.defaultMenuProps}
                                            user={this.state.user?.username} 
                                            routes={this.props.routes || App.getRoutes(this.state)} 
                                            context={this.props.context}/>
                            </ClientContext.Provider>
                        </TokenContext.Provider>
                    </ServerContext.Provider>
                    <Footer/>
                </StrictMode>
    }
}