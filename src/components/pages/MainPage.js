import React from 'react';
import { Helmet } from "react-helmet";

import useWsService from '../../hooks/ws.hook';

import Button from '@mui/material/Button';

import ReactVirtualizedTable from '../svyazkiTable/svyazkiTable';
import Stopwatch from '../stopwatch/Stopwatch';
import FiltersList from '../filtersList/filtersList';
import SvazkiTable from '../svyazkiList/svyazkiList';

import NewFilters from '../filtersList/newFilters';

// import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/bg.png'
import SvyazkiList from '../svyazkiList/svyazkiList';

const MainPage = () => {

  function saveFavorite(data) {
    pushFavorite(data);
  }

  function removeFavorite(data) {
    deleteFavorite(data.realId);
  }

  const {
    connectToServer, 
    stopAndNewSession, 
    initDisconnectByUser,
    changeFilters,
    session, 
    wsOnline, 
    arrayOfSvayzok, 
    stopwatch,
    arrayOfFavorites,
    pushFavorite,
    deleteFavorite,
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
        <NewFilters/>
      </div>

      <div>
        <Stopwatch
          currentTimeMs={stopwatch.msLeftLastUpdate}
          currentTimeSec={stopwatch.secLeftLastUpdate}
        />
      </div>

      <div style={{marginTop: '20px', marginBottom: '20px'}} className="svyazki">
        <span>Избранное</span>
        <SvyazkiList height={{height: 300}} data={arrayOfFavorites} onRowClick={removeFavorite}/>
        {/* <ReactVirtualizedTable height={300} data={arrayOfFavorites} onRowClick={removeFavorite}/> */}
      </div>

      <div style={{marginTop: '20px', marginBottom: '100px'}} className="svyazki">
        <span>Все</span>
        <SvyazkiList data={arrayOfSvayzok} onRowClick={saveFavorite}/>
        {/* <ReactVirtualizedTable height={600} data={arrayOfSvayzok} favoritesData={arrayOfFavorites} onRowClick={saveFavorite}/> */}
      </div>
      
      <img className="bg-decoration" src={decoration} alt="background"/>
    </>
  )
}

export default MainPage;