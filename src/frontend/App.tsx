import React, {Component } from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
  } from 'react-router-dom';
import { Home } from './screens/Home/Home';
import { Header } from './components/Header/Header';
import { Screen2 } from './screens/Screen2';
import { Screen3 } from './screens/Screen3';
import { Footer } from './components/Footer/Footer';

type AppProps = {
    socket: any
}

type AppState = {
    infos: any
}

export class App extends Component<AppProps, AppState> {

    constructor(props: AppProps){
        super(props);
        this.state = {
            infos: {
                apps: [],
                logger: {},
                rest: {},
                jwt: false,
                db: "initializing...",
                tokenUrl: ""
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
                        <Route path="/screen2">
                            <Screen2 className="screen2"/>
                        </Route>
                        <Route path="/screen3">
                            <Screen3 className="screen3"/>
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