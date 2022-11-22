import React from 'react';
import { useState, useEffect } from "react";

import {
  tradeTypesOptions,
  banksOptions,
  coinsOptions
} from '../constants/binance';

const wsUrl = 'ws://62.113.104.10:5000/';
const localhost = 'ws://localhost:5000/';

const useWsService = () => {

  const wsUrl = 'ws://62.113.104.10:5000/';
  const localhost = 'ws://localhost:5000/';
  
  const [session, setSession] = useState(`f${(+new Date()).toString(16)}`);
  const [socket, setSocket] = useState(null);
  const [wsOnline, setWsOnline] = useState(false);
  const [arrayOfSvayzok, setSvayzki] = useState([]);
  const [arrayOfFavoritesIds, setFavoritesIds] = useState([]);
  const [arrayOfFavorites, setFavorites] = useState([]);

  const [filters, setFilters] = useState({
    tradeTypes: [...tradeTypesOptions],
    coins: [...coinsOptions],
    banks: [...banksOptions],
    budget: 100000,
    liquidity: 0
  });

  const [lastUpdateInterval, setLastUpdateInterval] = useState(null);
  const [msLeftLastUpdate, setMsLeftLastUpdate] = useState(0);
  const [secLeftLastUpdate, setSecLeftLastUpdate] = useState(0);

  const startStopwatch = () => {
    resetStopwatch();

    const interval = setInterval(() => {
      setMsLeftLastUpdate((currentMs) => {
        if(currentMs >= 1000){
          setSecLeftLastUpdate(currentSec => currentSec + 1);
          return 0;
        }
        return currentMs + 10
      });
    }, 10);

    setLastUpdateInterval(interval)
  }

  const stopStopwatch = () => {
    clearInterval(lastUpdateInterval);
  }

  const resetStopwatch = () => {
    setMsLeftLastUpdate(0);
    setSecLeftLastUpdate(0);
  }

  const pushFavorite = (data) => {
    if(!arrayOfFavoritesIds.includes(data.realId)){
      setFavoritesIds([...arrayOfFavoritesIds, data.realId]);
      setFavorites([...arrayOfFavorites, arrayOfSvayzok[data.id]]);
      console.log('Связка сохранена в избранное');
    }else{
      console.log('Связка уже есть в избранном');
    }
  }

  useEffect(() => {
    sendFavorites();
  }, [arrayOfFavoritesIds])

  const deleteFavorite = (value) => {
    setFavoritesIds(arrayOfFavoritesIds.filter(num => num !== value));
    setFavorites(arrayOfFavorites.filter(obj => obj.id !== value));
    console.log('Связка удалена из избранного');
  }

  const sendFavorites = () => {
    if(wsOnline){
      socket.send(JSON.stringify({
        method: 'newFavorites',
        id: session,
        favorites: arrayOfFavoritesIds
      }))
      console.log('Избранное отправлено на сервер');
    }
  }


  const connectToServer = () => {
    const createdWs = new WebSocket(localhost);
    // const createdWs = new WebSocket(wsUrl);

    createdWs.onopen = () => {
      console.log('Подключение установлено');
      console.log(`Номер сессии: ${session}`);

      setWsOnline(true);
      startStopwatch();

      createdWs.send(JSON.stringify({
        username: 'test',
        method: 'connection',
        id: session,
        filters,
        favorites: arrayOfFavoritesIds,
      }))
    };
  
    createdWs.onmessage = (event) => {
      let msg = JSON.parse(event.data);
  
      switch (msg.method) {
        case 'send':
          console.log('Получено');
          setSvayzki(msg.data);
          setFavorites(msg.favorites)
          resetStopwatch();
          break;
        
        case 'ping':
          console.log('Получен ping от сервера');
          createdWs.send(JSON.stringify({method: 'pong', id: session}));
          console.log('Отправлен pong серверу');
          break;
        
        case 'disconnect':
          console.log('Сервер инициировал отключение');
          disconnect();
          console.log('Подключение разорвано сервером');
          break;

        case 'filtersApplied':
          console.log('Фильтры приняты сервером');
          break;

        default:
          break;
      }
    };

    setSocket(createdWs);
  };

  const changeFilters = (newFilters) => {

    const newTradeTypes = newFilters.tradeTypes.map(elemLabel => {
      return tradeTypesOptions.find(option => option.label === elemLabel);
    });

    const newBanks = newFilters.banks.map(elemLabel => {
      return banksOptions.find(option => option.label === elemLabel);
    });

    const filtersToSave = {
      ...newFilters,
      tradeTypes: newTradeTypes,
      banks: newBanks,
    }

    setFilters(filtersToSave);
    console.log('Фильтры сохранены');
    if(wsOnline){
      socket.send(JSON.stringify({
        method: 'newFilters',
        id: session,
        filters: filtersToSave
      }))
      console.log('Фильтры отправлены на сервер');
    }
  }
  
  const initDisconnectByUser = () => {
    console.log('Пользователь инициировал отключение');
    if(socket){
      socket.send(JSON.stringify({
        method: 'disconnect',
        id: session
      }));

      disconnect();
      console.log('Подключение разорвано пользователем');
    }else{
      console.log('Подключение не было произведено');
    }
  };

  const disconnect = () =>{
    if(socket){
      socket.close();
      setSocket(null);
      setWsOnline(false);
      stopStopwatch();
    }
  };

  const stopAndNewSession = () => {
    if(wsOnline) initDisconnectByUser();
    setSession(() => {
      const ns = `f${(+new Date()).toString(16)}`;
      console.log(`Новая сессия: ${ns}`);
      return ns;
    });
  };

  return {
    connectToServer,
    initDisconnectByUser,
    stopAndNewSession,
    changeFilters,
    session,
    wsOnline,
    arrayOfSvayzok,
    stopwatch: {
      msLeftLastUpdate,
      secLeftLastUpdate
    },
    arrayOfFavorites,
    pushFavorite,
    deleteFavorite
  };
}


export default useWsService;