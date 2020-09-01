import React, { useState, useEffect, CSSProperties } from 'react';
import { useHistory } from "react-router";
import { Token } from '../../utils/Token';

type LoginProps = {
    className?: string,
    onLogged?: (token: string) => void
}
 
export const Login = ({className, onLogged}:LoginProps) => {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const history = useHistory();

    const login = () => {
        const token = Token.getToken(username, password).then(token => {
            onLogged && onLogged(token);
            history.push('/');
        })
    };

    return  <div className={"login " + className}>
                <div>
                    <h2>Login</h2>
                    <input type="text" className="username" placeholder="Username..." onChange={e => setUsername(e.currentTarget.value)}/>
                    <input type="password" className="password" placeholder="Password..." onChange={e => setPassword(e.currentTarget.value)}/>
                    <button onClick={login}>Ok</button>
                </div>
            </div>
}