import React, { useEffect, useState } from 'react'
import { AppScreenProps, Button, ClassNameHelper, Heading, Link, Switch, TextInput } from 'pizi-react'
import { Token } from '../../utils/Token'

type LoginProps = AppScreenProps & {
    user?: any
}
 
export const Login = ({user = {}}: LoginProps) => {
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const[stayConnected, setStayConnected] = useState(false)
    const[loginError, setLoginError] = useState("")
    const[loginAnimation, setLoginAnimation] = useState(false)

    const urlParams = new URLSearchParams(window.location.search)
    const client_id = urlParams.get('clientId')
    const response_type = urlParams.get('responseType')
    const state = urlParams.get('state')
    const code_challenge_method =urlParams.get('codeChallengeMethod')
    const code_challenge = urlParams.get('codeChallenge')

    useEffect(()=>{
        setLoginError("")
        setLoginAnimation(false)
    }, [username, password])

    const login = async () => {
        try{
            setLoginAnimation(false)
            if(user){
                await Token.clearToken()
                location.href = "/"
            } else {
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
                })
                if(response.status === 200){
                    const { redirectUri } = await response.json()
                    if(redirectUri) location.href = redirectUri
                } else {
                    setLoginError(`invalid credentials`)
                    setLoginAnimation(true)
                }
            }
        } catch(e){
            setLoginError(`invalid credentials`)
            console.log("error with login")
        }
    }

    return  <div className="pizi-container login">
                <div className="pizi-container login-box">
                    <Heading tag="h2">Login</Heading>
                    {
                        user ? <>
                            <Button appearance="fill" onClick={login} color="error">sign out</Button>
                        </> : <>
                            <TextInput type="text" className="username" label="Username" onChange={setUsername} onKeyEnter={login} />
                            <TextInput type="password" className="password" label="Password" onChange={setPassword} onKeyEnter={login}/>
                            <Link to="/todefine">forgot your password ?</Link>
                            <Switch labelPosition='right' label="stay connected" onChange={setStayConnected}/>
                            <span className={ClassNameHelper("error animate__animated", {
                                "animate__headShake": loginAnimation
                            })}>{loginError}</span>
                            <Button appearance="fill"onClick={login} className="login-button">sign in</Button>
                        </>
                    }
                </div>
            </div>
}