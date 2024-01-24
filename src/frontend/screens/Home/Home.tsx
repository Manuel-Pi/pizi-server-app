import React, { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import jwtDecode from 'jwt-decode'
import { AppScreenProps, Button, Heading, Link } from 'pizi-react'
import { H } from '../../components/Headings/Heading'
import { TokenContext } from '../../utils/Token'

type HomeProps = AppScreenProps & {
    infos?: any
}

export const Home = ({infos = { logger: {}, apps: []}}:HomeProps) => {
    const[displayDetail, setDisplayDetail] = useState("")
    const[currentTime, setCurrentTime] = useState(new Date())
    const token = useContext(TokenContext)

    const tokenToParse: any = {}
    const tokenDecoded:any = tokenToParse.jwt ? jwtDecode(tokenToParse.jwt) : {}
    const tokenHeaderDecoded:any = tokenToParse.jwt ? jwtDecode(tokenToParse.jwt, { header: true }) : {}
    const tokenExpireDate = tokenToParse.jwt ? (new Date()).setUTCSeconds(tokenDecoded.exp) : null
    const tokenIssueDate = tokenToParse.jwt ? (new Date()).setUTCSeconds(tokenDecoded.iat) : null

    const formatDate = (dateString: number) => {
        const date = new Date(0)
        date.setUTCSeconds(dateString)
        return date.toLocaleString()
    }

    useEffect(()=>{
        setInterval( () => {
            setCurrentTime(new Date())
        }, 60000)
    }, [])


    const publicHome = <>
        <div className='pizi-container public'>
            <img src="/icon.png"/>
            <H tag="h1">Pizi Server</H>
            <H tag="h3" color="teritary">A simple Node.js server providing oauth2 authentification</H>
            <Button appearance="fill"onClick={ () => window.location.href = "/api/app/login"}>sign in</Button>
        </div>
    </>
    
    return  <div className="pizi-container home">
                { !token ? publicHome : <H tag="h1">
                    Pizi Server
                    <span className="date">
                        <div>
                        {
                            [currentTime.toLocaleDateString('en-US', {weekday: 'long'}).toLowerCase(),
                            currentTime.toLocaleDateString('en-US', {day: 'numeric'}),
                            currentTime.toLocaleDateString('en-US', {month: 'long'}).toLowerCase(),
                            currentTime.toLocaleDateString('en-US', {year: 'numeric'})].join(" ")
                        }
                        </div>
                        <div className="time">
                        {
                            currentTime.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
                        }
                        </div>
                    </span>
                </H>}

                <div className={"infos hidden"}>
                    <Heading tag="h3">Modules</Heading>
                    <div className={"items " + ( displayDetail ? "display-details" : "")}>
                        <div className={"info " + ( displayDetail === "jwt" ? "active" : "")} onClick={ e => setDisplayDetail(displayDetail === "jwt" ? "" : "jwt")}>
                            <div className="badge">
                                <FontAwesomeIcon icon="shield-alt"/>
                                <label>jwt token</label>
                                {infos.jwt ? <span className="enabled">enabled</span>: <span className="disabled">disabled</span>}
                            </div>
                            <ul className="detail">
                                <h4>informations</h4>
                                <li>
                                    <label>need token:</label>
                                    {infos.jwt ? <span className="enabled">enabled</span>: <span className="disabled">disabled</span>}
                                </li>
                                <li>
                                    <label>token url:</label>
                                    <a className="rest-url" href={infos.tokenUrl} target="_blank">{infos.tokenUrl}</a>
                                </li>
                                <li>
                                    <label>expire:</label>
                                    <span>{infos.tokenExpire}</span>
                                </li>
                                <h4>current token</h4>
                                <h5>header</h5>
                                {
                                    Object.keys(tokenHeaderDecoded).map(key => <li>
                                                                            <label>{key}:</label>
                                                                            <span>{tokenHeaderDecoded[key]}</span>
                                                                        </li>)
                                }
                                <h5>payload</h5>
                                {
                                    Object.keys(tokenDecoded).map(key => <li>
                                                                            <label>{key}:</label>
                                                                            <span>{(key === "exp" || key === "iat") ? formatDate(tokenDecoded[key]) : tokenDecoded[key]}</span>
                                                                        </li>)
                                }
                            </ul>
                        </div>
                        <div className={"info " + ( displayDetail === "db" ? "active" : "")} onClick={ e => setDisplayDetail(displayDetail === "db" ? "" : "db")}>
                            <div className="badge">
                                <FontAwesomeIcon icon="database"/>
                                <label>database</label>
                                <span className={infos.db}>{infos.db}</span>
                            </div>
                            <ul className="detail">
                                <h4>informations</h4>
                                <li>
                                    <label>type:</label>
                                    <span>mongoDB</span>
                                </li>
                                <li>
                                    <label>url:</label>
                                    <span>{infos.dbUrl}</span>
                                </li>
                                <li>
                                    <label>status:</label>
                                    <span className={infos.db}>{infos.db}</span>
                                </li>
                                <li>
                                    <label>version:</label>
                                    <span>{infos.dbVersion}</span>
                                </li>
                            </ul>
                        </div>
                        <div className={"info " + ( displayDetail === "rest" ? "active" : "")} onClick={ e => setDisplayDetail(displayDetail === "rest" ? "" : "rest")}>
                            <div className="badge">
                                <FontAwesomeIcon icon="plug"/>
                                <label>rest api</label>
                                <span>
                                    <a className="rest-url" href={infos.rest?.url} target="_blank">{infos.rest?.url}</a>
                                </span>
                            </div>
                            <ul className="detail">
                                <h4>informations</h4>
                                <li>
                                    <label>endpoint:</label>
                                    <span><a className="rest-url" href={infos.rest?.url} target="_blank">{infos.rest?.url}</a></span>
                                </li>
                                <li>
                                    <label>rest ui:</label>
                                    <span><Link to="/pizi-rest-ui">/pizi-rest-ui</Link></span>
                                </li>
                            </ul>
                        </div>
                        <div className={"info " + ( displayDetail === "log" ? "active" : "")} onClick={ e => setDisplayDetail(displayDetail === "log" ? "" : "log")}>
                            <div className="badge">
                                <FontAwesomeIcon icon="binoculars"/>
                                <label>loggers</label>
                                <span>{infos.logger?.server}</span>
                            </div>
                            <ul className="detail">
                                <h4>server</h4>
                                {Object.keys(infos.logger).filter(key => key === "server").map((logger:string) => <li>
                                                    <label>{"level:"}</label>
                                                    <span>{infos.logger[logger]}</span>
                                                </li>
                                )}
                                <h4>apps</h4>
                                {Object.keys(infos.logger).filter(key => key !== "server").map((logger:string) => <li>
                                                    <label>{logger + ":"}</label>
                                                    <span>{infos.logger[logger]}</span>
                                                </li>
                                )}
                            </ul> 
                        </div>
                    </div>
                </div>
                <div className="apps hidden">
                    <Heading tag="h3" appearance='simple'>Applications</Heading>
                    <div className="apps-list">
                        {infos.apps.map((app:any) => <a className="app" target="_blank" href={"/" + app.name}>
                                            <img src={"/" + app.name + "/icon.png"} onError={e => e.currentTarget.src = "/app-no-logo.png"}/>
                                            <label>{app.name}</label>
                                        </a>
                        )}
                    </div>
                </div>
            </div>
}