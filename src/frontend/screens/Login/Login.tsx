import React, { useState, useEffect, CSSProperties } from 'react';
import { useHistory } from "react-router";
import { Token } from '../../utils/Token';
import { CreateClassName } from '../../utils/Utils';

type LoginProps = {
    className?: string
    onLogged?: (token: string) => void
    token: any
}
 
export const Login = ({className, onLogged, token = {}}:LoginProps) => {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const history = useHistory();

    const login = () => {
        if(token.jwt){
            token = {};
            Token.clearToken();
            onLogged && onLogged(token);
            history.push('/');
        } else {
            Token.getToken(username, password).then(token => {
                if(!token || !token.jwt) return;
                onLogged && onLogged(token);
                history.push('/');
            })
        }
    };

    const usernameClassName = CreateClassName({
        "hidden": token.jwt
    }, "username");

    const passwordClassName = CreateClassName({
        "hidden": token.jwt
    }, "password");

    return  <div className={"login " + className}>
                <div>
                    <h2>Login</h2>
                    <input type="text" className={usernameClassName} placeholder="Username..." onChange={e => setUsername(e.currentTarget.value)}/>
                    <input type="password" className={passwordClassName} placeholder="Password..." onChange={e => setPassword(e.currentTarget.value)}/>
                    <button onClick={login}>{ token.jwt ? "sign out" : "sign in"}</button>
                </div>
            </div>
}