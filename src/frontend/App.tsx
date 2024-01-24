import React, { Component, StrictMode, createContext } from 'react'
import { Home } from './screens/Home/Home'
import { Footer } from './components/Footer/Footer'
import { RestUI } from './screens/RestUI/RestUI'
import { Token, TokenContext } from './utils/Token'
import { MenuApp } from 'pizi-react'
import { Account } from './screens/Account/Account'
import { RestUIDetail } from './screens/RestUI/RestUIDetail'
import { Login } from './screens/Login/Login'

type AppProps = {
    socket: any
}

type AppState = {
    infos: any
    token: any
    user: any
}

export class App extends Component<AppProps, AppState> {

    constructor(props: AppProps){
        super(props)
        this.state = {
            token: null,
            user: null,
            infos: {
                apps: [],
                logger: {},
                rest: {},
                jwt: false,
                db: "initializing...",
                tokenUrl: "",
                tokenExpire: "",
                https: false
            }
        }
    }

    async componentDidMount(){
        // Try to reconnect
        this.props.socket.on("connect", () => {
            // TODO: implement
        })
        this.props.socket.on("infos", (infos :any) => this.setState({infos}))

        const token = await Token.getToken()
        if(!token) return
        this.setState({token})
        await this.getLoggedUser()
    }

    async getLoggedUser(){
        const token = await Token.getToken()
        if(token){
            const response = await fetch(`/api/rest/users/${token.userId}`, { headers: Token.getAuthorizationHeader() })
            const user = await response.json()
            this.setState({user})
        }
    }

    render(){
        return  <>
                    <StrictMode>
                        <TokenContext.Provider value={this.state.token}>
                            <MenuApp appearance='fill' color='main' logo={<img src="/icon.png"></img>} user={this.state.user?.username}>
                                <Login   title="Account" path="/login"   icon="user" user={this.state.user} noMenu hideInMenu></Login>
                                <Home    title="Home"    path="/"        icon="home" noMenu={!this.state.user}/>
                                <Account title="Account" path="/account" icon="user" user={this.state.user} hideInMenu={!this.state.user}/>
                                <RestUI  title="Rest UI" path="/rest"    icon="plug" hideInMenu={!this.state.user}>
                                    <RestUIDetail title="Rest UI" path="/:collectionName" icon="plug" hideInMenu/>
                                </RestUI>
                            </MenuApp>
                        </TokenContext.Provider>
                        <Footer/>
                    </StrictMode>
                </>
    }
}