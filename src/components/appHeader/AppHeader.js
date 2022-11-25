import React from 'react';

import { Link } from 'react-router-dom';
import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>TERRAN P2P LAB</span>
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li style={{color: 'inherit'}} >Внутрибиржевой арбитраж</li>
                    <li style={{color: '#d2d2cb'}} >Межбиржевой арбитраж</li>
                    <li style={{color: '#d2d2cb'}} >Отчетность</li>
                    <li style={{color: '#d2d2cb'}} >Профиль</li>
                    
                    {/* <li><NavLink 
                        
                        style={({ isActive }) => ({ color: isActive ? '#9F0013' : 'inherit'})} 
                        to="/comics"
                    >Профиль</NavLink></li> */}
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;