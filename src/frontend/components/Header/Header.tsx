import React, { useState, useEffect, CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CreateClassName } from '../../utils/Utils';
import { Link } from 'react-router-dom';

type HeaderProps = {
    className?: string
}
 
export const Header = ({className}:HeaderProps) => {
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
                    <FontAwesomeIcon icon="bars" className="menu-button" onClick={() => setMenuOpen(!menuOpen)}/>
                </header>
                <nav className={headerMenuClassName}>
                    <div className="menu-container">
                        <Link to="/" onClick={() => setMenuOpen(false)}>
                            <FontAwesomeIcon icon="compass"/>
                            <label>Screen 1</label>
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