import React, { Component } from 'react';
import { Home } from './screens/Home/Home';
import { Login } from './screens/Login/Login';
import { Screen2 } from './screens/Screen2';
import { Screen3 } from './screens/Screen3';
import { Footer } from './components/Footer/Footer';
import { RestUI } from './screens/RestUI/RestUI';
import { Token } from './utils/Token';
import { Button } from 'pizi-react';

type AppProps = {
    socket: any
}

type AppState = {
    infos: any,
    token: any
}

export class App extends Component<AppProps, AppState> {

    constructor(props: AppProps){
        super(props);
        this.state = {
            token: {},
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

    componentDidMount(){
        // Try to reconnect
        this.props.socket.on("connect", () => {
            // TODO: implement
        });

        this.props.socket.on("infos", (infos :any) => this.setState({infos}));
        Token.getToken().then(token => token && this.setState({token}));
    }

    render(){
        return  <>
                    <Button>Test</Button>
                    <Footer/>
                </>
    }
}