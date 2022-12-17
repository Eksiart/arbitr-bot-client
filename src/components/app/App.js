import React from 'react';

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import LinearProgress from '@mui/material/LinearProgress';


import Container from '@mui/material/Container';

import './App.scss';

// const Page404 = lazy(() => import('../pages/404'));
// const MainPage = lazy(() => import('../pages/MainPage'));
// const RatesPage = lazy(() => import('../pages/RatesPage'));
// const OffersPage = lazy(() => import('../pages/OffersPage'));
const MainPage = import('../pages/MainPage');
const RatesPage = import('../pages/RatesPage');
const OffersPage = import('../pages/OffersPage');

function App() {
    return (
        <Router>
            <Container disableGutters={true} maxWidth="false">
                <AppHeader/>
            </Container>
            <Suspense fallback={<LinearProgress/>}>
                <div className='app__body'>
                    <Routes>
                        {/* <Route path='/' element={<MainPage/>}/> */}
                        <Route path='/p2p/:market' element={<MainPage/>}/>
                        <Route path='/rates' element={<RatesPage/>}/>
                        <Route path='/market' element={<OffersPage/>}/>
                        <Route path='*' element={<Navigate to='/p2p/binance'/>}/>
                    </Routes>
                </div>
            </Suspense>
        </Router>
    );
}

export default App;
