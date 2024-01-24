import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CreateClassName } from '../../utils/Utils';
import { Link } from 'react-router-dom';

type HeaderProps = {
    className?: string
    token?: any
}
 
export const Header = ({className, token = {}}:HeaderProps) => {
    const[menuOpen, setMenuOpen] = useState(false);
    const headerClassName  = CreateClassName({
        "header": true
    }, className);
    const headerMenuClassName  = CreateClassName({
        "menu": true,
        "hidden": !menuOpen
    }, className);
    return  <>
                <header className={headerClassName}>
                    <Link to="/"><FontAwesomeIcon icon="server"/></Link>
                    <span className="username">
                        <FontAwesomeIcon icon="user"/>
                        <div>
                            <div>{token.user || "not logged"}</div>
                            <div>{token.role || "anonymous"}</div>
                        </div>
                    </span>
                    <Link to="/login" style={{position: "absolute", right: "34px"}}><FontAwesomeIcon icon={token.jwt ? "sign-out-alt" : "sign-in-alt"}/></Link>
                </header>
                <nav className={headerMenuClassName}>
                    <div className="menu-container">
                        <Link to="/login" onClick={() => setMenuOpen(false)}>
                            <FontAwesomeIcon icon="sign-in-alt"/>
                            <label>Login</label>
                        </Link>
                        <Link to="/" onClick={() => setMenuOpen(false)}>
                            <FontAwesomeIcon icon="home"/>
                            <label>Home</label>
                        </Link>
                        <Link to="/screen2" onClick={() => setMenuOpen(false)}>
                            <FontAwesomeIcon icon="compass"/>
                            <label>Screen 2</label>
                        </Link>
                        <Link to="/screen3" onClick={() => setMenuOpen(false)}>
                            <FontAwesomeIcon icon="compass"/>
                            <label>Screen 3</label>
                        </Link>
                    </div>
                </nav>
            </>
}