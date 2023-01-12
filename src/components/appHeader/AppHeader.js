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
                    {/* <NavLink 
                        to="/rates"
                        className={({ isActive }) => {
                            return isActive ? "active" : "";
                        }}
                    >
                        <span>Акутальные курсы</span>
                    </NavLink> */}
                    <span style={{color: '#d2d2cb'}}>Акутальные курсы</span>

                    <NavLink 
                        to="/p2p/binance"
                        className={({ isActive }) => {
                            return isActive ? "active" : "";
                        }}
                    >
                        <span>Внутрибиржевой арбитраж</span>
                    </NavLink>
                    <NavLink 
                        to="/cross/direct"
                        className={({ isActive }) => {
                            return isActive ? "active" : "";
                        }}
                    >
                        <span>Межбиржевой арбитраж</span>
                    </NavLink>
                    {/* <NavLink 
                        to="/market"
                        className={({ isActive }) => {
                            return isActive ? "active" : "";
                        }}
                    >
                        <span>Поиск предложений</span>
                    </NavLink> */}
                    <span style={{color: '#d2d2cb'}}>Поиск предложений</span>
                    <span style={{color: '#d2d2cb'}}>Отчетность</span>
                </div>
            </div>
            <Divider/>
            {location.pathname.includes('p2p') && 
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
                            <span style={{color: '#d2d2cb'}}>Garantex</span>
                            <span style={{color: '#d2d2cb'}}>Bitzlato</span>
                            <span style={{color: '#d2d2cb'}}>Huobi</span>
                            <span style={{color: '#d2d2cb'}}>Bybit</span>
                            <span style={{color: '#d2d2cb'}}>OKX</span>
                        </div>
                    </div>
                <Divider/>
                </>
            }
            {location.pathname.includes('cross') && 
                <>
                    <div className='header__bottom'>
                        <div>
                            <NavLink 
                                to="/cross/direct"
                                className={({ isActive }) => {
                                    return isActive ? "active" : "";
                                }}
                            >
                                <span>Прямой арбитраж</span>
                            </NavLink>
                            {/* <NavLink 
                                to="/cross/spot"
                                className={({ isActive }) => {
                                    return isActive ? "active" : "";
                                }}
                            >
                                <span>Со спотом</span>
                            </NavLink> */}
                            <span style={{color: '#d2d2cb'}}>Со спотом</span>
                        </div>
                    </div>
                <Divider/>
                </>
            }

        </header>
    )
}

export default AppHeader;