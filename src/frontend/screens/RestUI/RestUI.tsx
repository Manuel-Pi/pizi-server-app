import React, { useState, useEffect, CSSProperties } from 'react';
import { Link, Switch, Route, useParams } from 'react-router-dom';
import { RestUIDetail } from './RestUIDetail';

type RestUIProps = {
    className?: string
}
 
export const RestUI = ({className}:RestUIProps) => {
    let { collectionId } = useParams();
    return  <div className={"rest-ui " + className}>
                <h1>Pizi REST</h1>
                <div className="collections">
                    <h3>Collections</h3>
                    <ul>
                        <li className={collectionId === "users" ? "active" : ""}>
                            <Link to="/pizi-rest-ui/users">Users</Link>
                        </li>
                        <li className={collectionId === "games" ? "active" : ""}>
                            <Link to="/pizi-rest-ui/games">Games</Link>
                        </li>
                    </ul>
                </div>
                <Switch>
                    <Route path="/pizi-rest-ui/:collectionId">
                        <RestUIDetail/>
                    </Route>
                </Switch>
            </div>
}