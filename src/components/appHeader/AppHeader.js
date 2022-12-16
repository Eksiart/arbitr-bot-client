import React from 'react';

import { NavLink, Link, useLocation } from 'react-router-dom';
import './appHeader.scss';

import Divider from '@mui/material/Divider';

const AppHeader = () => {
    const location = useLocation();

    return (
        <header className="header">
            <div className='header__top'>
                <h1 className="header__top-title">
                    <Link to="/rates">
                        <span>TERRAN P2P LAB</span>
                    </Link>
                </h1>
                <div className='header__top-profile' style={{color: '#d2d2cb'}}>ПРОФИЛЬ</div>
            </div>
            <Divider/>
            <div className='header__middle'>
                <div>
                    <NavLink 
                        to="/rates"
                        className={({ isActive }) => {
                            return isActive ? "active" : "";
                        }}
                    >
                        <span>Акутальные курсы</span>
                    </NavLink>

                    <NavLink 
                        to="/p2p"
                        className={({ isActive }) => {
                            return isActive ? "active" : "";
                        }}
                    >
                        <span>Внутрибиржевой арбитраж</span>
                    </NavLink>
                    <span style={{color: '#d2d2cb'}}>Межбиржевой арбитраж</span>
                    <NavLink 
                        to="/market"
                        className={({ isActive }) => {
                            return isActive ? "active" : "";
                        }}
                    >
                        <span>Поиск предложений</span>
                    </NavLink>
                    <span style={{color: '#d2d2cb'}}>Отчетность</span>
                </div>
            </div>
            <Divider/>
            {location.pathname.includes('p2p') ? 
                <>
                    <div className='header__bottom'>
                        <div>
                            <NavLink 
                                to="/p2p/binance"
                                className={({ isActive }) => {
                                    return isActive ? "active" : "";
                                }}
                            >
                                <span>Binance</span>
                            </NavLink>
                            <NavLink 
                                to="/p2p/garantex"
                                className={({ isActive }) => {
                                    return isActive ? "active" : "";
                                }}
                            >
                                <span>Garantex</span>
                            </NavLink>
                            <span style={{color: '#d2d2cb'}}>Bitzlato</span>
                            <span style={{color: '#d2d2cb'}}>Huobi</span>
                            <span style={{color: '#d2d2cb'}}>Bybit</span>
                            <span style={{color: '#d2d2cb'}}>OKX</span>
                        </div>
                    </div>
                <Divider/>
                </>
            : null}

        </header>
    )
}

export default AppHeader;