import React, {Component } from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
  } from 'react-router-dom';
import { Home } from './screens/Home/Home';
import { Header } from './components/Header/Header';
import { Login } from './screens/Login/Login';
import { Screen2 } from './screens/Screen2';
import { Screen3 } from './screens/Screen3';
import { Footer } from './components/Footer/Footer';
import { RestUI } from './screens/RestUI/RestUI';
import { RestUIDetail } from './screens/RestUI/RestUIDetail';

type AppProps = {
    socket: any
}

type AppState = {
    infos: any,
    token: string
}

export class App extends Component<AppProps, AppState> {

    constructor(props: AppProps){
        super(props);
        this.state = {
            token: null,
            infos: {
                apps: [],
                logger: {},
                rest: {},
                jwt: false,
                db: "initializing...",
                tokenUrl: "",
                tokenExpire: "",
                https: false
            }
        }
    }

    componentDidMount(){
        // Try to reconnect
        this.props.socket.on("connect", () => {
            // TODO: implement
        });

        this.props.socket.on("infos", (infos :any) => this.setState({infos}));
    }

    render(){
        return <Router>
                <Header/>
                <main>
                    <Switch>
                        <Route path="/login">
                            <Login onLogged={token => this.setState({token})}/>
                        </Route>
                        <Route path="/screen2">
                            <Screen2/>
                        </Route>
                        <Route path="/screen3">
                            <Screen3/>
                        </Route>
                        <Route path={["/pizi-rest-ui/:collectionId", "/pizi-rest-ui"]}>
                            <RestUI/>
                        </Route>
                        <Route path="/">
                            <Home infos={this.state.infos}/>
                        </Route>
                    </Switch>
                </main>
                <Footer/>
            </Router>
    }
}