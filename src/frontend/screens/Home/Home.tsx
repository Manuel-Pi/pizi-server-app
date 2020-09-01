import React, { useState, useEffect, CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

type HomeProps = {
    className?: string,
    infos: any,
}



 
export const Home = ({className, infos}:HomeProps) => {
    const[users, setUsers] = useState([]);
    const[displayDetail, setDisplayDetail] = useState("");

    useEffect(() => {
        fetch("https://localhost:8087/pizi-rest/users", {
            headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(response => response.json())
        .then(json =>setUsers(json));
    }, []);

    return  <div className={"home " + className}>
                <h1>Pizi Server</h1>
                <div className="main-infos">
                    <span>{infos.https ? "https" : "http"}</span>
                    <span>on</span>
                    <span>{infos.port}</span>
                </div>
                <div className={"infos"}>
                    <h3>Informations</h3>
                    <div className={"items " + ( displayDetail ? "display-details" : "")}>
                        <div className={"info " + ( displayDetail === "jwt" ? "active" : "")} onClick={ e => setDisplayDetail(displayDetail === "jwt" ? "" : "jwt")}>
                            <div className="badge">
                                <FontAwesomeIcon icon="shield-alt"/>
                                <label>jwt token</label>
                                {infos.jwt ? <span className="enabled">enabled</span>: <span className="disabled">disabled</span>}
                            </div>
                            <ul className="detail">
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
                            </ul>
                        </div>
                        <div className={"info " + ( displayDetail === "db" ? "active" : "")} onClick={ e => setDisplayDetail(displayDetail === "db" ? "" : "db")}>
                            <div className="badge">
                                <FontAwesomeIcon icon="database"/>
                                <label>database</label>
                                <span className={infos.db}>{infos.db}</span>
                            </div>
                            <ul className="detail">
                                <li>
                                    <label>type:</label>
                                    <span>mongoDB</span>
                                </li>
                                <li>
                                    <label>status:</label>
                                    <span className={infos.db}>{infos.db}</span>
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
                                <li>
                                    <label>url:</label>
                                    <span><a className="rest-url" href={infos.rest.url} target="_blank">{infos.rest.url}</a></span>
                                </li>
                                <li>
                                    <label>ui:</label>
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
                                {Object.keys(infos.logger).map((logger:string) => <li>
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
                                            <img src={"/" + app.name + "/icon.png"}/>
                                            <label>{app.name}</label>
                                        </a>
                        )}
                    </div>
                </div>
            </div>
}