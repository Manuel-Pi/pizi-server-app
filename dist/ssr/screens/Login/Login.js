import React, { useEffect, useState } from 'react';
import { Button, ClassNameHelper, Heading, Link, Switch, TextInput, isBrowser, Token } from 'pizi-react';
export const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [stayConnected, setStayConnected] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [loginAnimation, setLoginAnimation] = useState(false);
    const urlParams = new URLSearchParams(isBrowser() ? window.location.search : {});
    const client_id = urlParams.get('clientId');
    const response_type = urlParams.get('responseType');
    const state = urlParams.get('state');
    const code_challenge_method = urlParams.get('codeChallengeMethod');
    const code_challenge = urlParams.get('codeChallenge');
    useEffect(() => {
        setLoginError("");
        setLoginAnimation(false);
    }, [username, password]);
    const login = async () => {
        try {
            setLoginAnimation(false);
            if (props.user) {
                await Token.clearToken();
                location.href = "/";
            }
            else {
                const response = await fetch("/api/oauth/authorize", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        response_type,
                        client_id,
                        username,
                        password,
                        stayConnected,
                        state,
                        code_challenge_method,
                        code_challenge
                    })
                });
                if (response.status === 200) {
                    const { redirectUri } = await response.json();
                    if (redirectUri)
                        location.href = redirectUri;
                }
                else {
                    setLoginError(`invalid credentials`);
                    setLoginAnimation(true);
                }
            }
        }
        catch (e) {
            setLoginError(`invalid credentials`);
            console.log("error with login");
        }
    };
    return React.createElement("div", { className: "pizi-container login" },
        React.createElement("div", { className: "pizi-container login-box" },
            React.createElement(Heading, { tag: "h2" }, "Login"),
            props.user ? React.createElement(React.Fragment, null,
                React.createElement(Button, { appearance: "fill", onClick: login, color: "error" }, "sign out")) : React.createElement(React.Fragment, null,
                React.createElement(TextInput, { type: "text", className: "username", label: "Username", onChange: setUsername, onKeyEnter: login }),
                React.createElement(TextInput, { type: "password", className: "password", label: "Password", onChange: setPassword, onKeyEnter: login }),
                React.createElement(Link, { to: "/todefine" }, "forgot your password ?"),
                React.createElement(Switch, { labelPosition: 'right', label: "stay connected", onChange: setStayConnected }),
                React.createElement("span", { className: ClassNameHelper("error animate__animated", {
                        "animate__headShake": loginAnimation
                    }) }, loginError),
                React.createElement(Button, { appearance: "fill", onClick: login, className: "login-button" }, "sign in"))));
};
