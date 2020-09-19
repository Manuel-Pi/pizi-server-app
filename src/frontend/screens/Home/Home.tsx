import React, { useState, useEffect, CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

type HomeProps = {
    className?: string,
    infos: any,
    token: any 
}

 
export const Home = ({className, infos, token}:HomeProps) => {
    const[displayDetail, setDisplayDetail] = useState("");
    const[currentTime, setCurrentTime] = useState(new Date());

    const tokenDecoded:any = token.jwt ? jwtDecode(token.jwt) : {};
    const tokenHeaderDecoded:any = token.jwt ? jwtDecode(token.jwt, { header: true }) : {};
    const tokenExpireDate = token.jwt ? (new Date()).setUTCSeconds(tokenDecoded.exp) : null;
    const tokenIssueDate = token.jwt ? (new Date()).setUTCSeconds(tokenDecoded.iat) : null;

    const formatDate = (dateString: number) => {
        let date = new Date(0);
        date.setUTCSeconds(dateString);
        return date.toLocaleString();
    };

    useEffect(()=>{
        setInterval( () => {
            setCurrentTime(new Date());
        }, 1000);
    }, [])
    
    return  <div className={"home " + className}>
                <h1>Pizi Server</h1>
                <div className="main-infos">
                    <span>{infos.https ? "https" : "http"}</span>
                    <span>on</span>
                    <span>{infos.port}</span>
                    <span>
                        <div>
                        {
                            currentTime.toLocaleDateString('en-US', {weekday: 'long'}).toLowerCase() + " " +
                            currentTime.toLocaleDateString('en-US', {day: 'numeric'}) + " " +
                            currentTime.toLocaleDateString('en-US', {month: 'long'}).toLowerCase()  + " "  +
                            currentTime.toLocaleDateString('en-US', {year: 'numeric'}) 
                        }
                        </div>
                        <div>
                        {
                            currentTime.toLocaleTimeString()
                        }
                        </div>
                     </span>
                </div>
                <div className={"infos"}>
                    <h3>Modules</h3>
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
                                    <a className="rest-url" href={infos.rest.url} target="_blank">{infos.rest.url}</a>
                                </span>
                            </div>
                            <ul className="detail">
                                <h4>informations</h4>
                                <li>
                                    <label>endpoint:</label>
                                    <span><a className="rest-url" href={infos.rest.url} target="_blank">{infos.rest.url}</a></span>
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
                                <span>{infos.logger.server}</span>
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
                <div className="apps">
                    <h3>Applications</h3>
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