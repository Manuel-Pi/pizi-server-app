import React, { useState, useEffect, CSSProperties } from 'react';

type HomeProps = {
    className?: string,
    infos: any
}
 
export const Home = ({className, infos}:HomeProps) => {
    const[inputValue, setInputValue] = useState("");
    return  <div className={"home " + className}>
                <h1>Pizi Server</h1>
                <div className="infos">
                    <h3>Informations</h3>
                    <div className="info">
                        <label>port:</label>
                        <span>{infos.port}</span>
                    </div>
                    <div className="info">
                        <label>database:</label>
                        <span className={infos.db}>{infos.db}</span>
                    </div>
                    <div className="info">
                        <label>jwt token:</label>
                        {infos.jwt ? <span className="enabled">enabled</span>: <span className="disabled">disabled</span>}
                    </div>
                    <div className="info">
                        <label>token url:</label>
                        <a className="rest-url" href={infos.tokenUrl} target="_blank">{infos.tokenUrl}</a>
                    </div>
                    <div className="info">
                        <label>rest api:</label>
                        <a className="rest-url" href={infos.rest.url} target="_blank">{infos.rest.url}</a>
                    </div>
                    <div className="info">
                        <label>loggers:</label>
                        {Object.keys(infos.logger).map((logger:string) => <div className="list-info">
                                            <label>- {logger} ></label>
                                            <span>{infos.logger[logger]}</span>
                                        </div>
                        )}
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