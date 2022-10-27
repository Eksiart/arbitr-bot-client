import React from 'react';
import { Helmet } from "react-helmet";

import useWsService from '../../hooks/ws.hook';

import Button from '@mui/material/Button';

import SvyazkiList from "../svyazkiList/svyazkiList";
import Stopwatch from '../stopwatch/Stopwatch';
import FiltersList from '../filtersList/filtersList';

// import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/bg.png'

const MainPage = () => {

  const {
    connectToServer, 
    stopAndNewSession, 
    initDisconnectByUser,
    changeFilters,
    session, 
    wsOnline, 
    arrayOfSvayzok, 
    stopwatch
  } = useWsService();

  return(
    <>
      <Helmet>
        <meta
          name="description"
          content="Terano P2P lab"
          />
        <title>Teran P2P</title>
      </Helmet>

      <Button color="error" onClick={stopAndNewSession} variant="contained">Обновить сессию</Button>
      <div style={{marginTop: '10px', fontWeight: 'bold'}}>
        <span>Номер сессии: {session}</span>
      </div>

      <div style={{marginTop: '20px'}}>
        <Button disabled={wsOnline} onClick={connectToServer} variant="contained">Подключиться</Button>
        <Button style={{marginLeft: '10px'}} disabled={!wsOnline} onClick={initDisconnectByUser} variant="contained">Отключиться</Button>

        <FiltersList changeFilters={changeFilters}/>
      </div>

      <div>
        <Stopwatch
          currentTimeMs={stopwatch.msLeftLastUpdate}
          currentTimeSec={stopwatch.secLeftLastUpdate}
        />
      </div>

      <div style={{marginTop: '20px', marginBottom: '100px'}} className="svyazki">
        <SvyazkiList arrayOfSvayzok={arrayOfSvayzok}/>
      </div>
      <img className="bg-decoration" src={decoration} alt="background"/>
    </>
  )
}

export default MainPage;