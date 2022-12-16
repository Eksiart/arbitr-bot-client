// eslint-disable-next-line
import React from 'react';
const wsUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_WS_URL : process.env.REACT_APP_PROD_WS_URL;
let socket = null;

const useWsService = (globalState, svyazkiState, filtersState, stopwatchState) => {

  const connectToServer = () => {
    // socket = new WebSocket(localhost);
    socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log('Подключение установлено');
      console.log(`Номер сессии: ${globalState.session}`);

      globalState.setWsOnline(true);

      stopwatchState.setRun(true);
      stopwatchState.setLastUpdate();

      socket.send(JSON.stringify({
        username: 'test',
        method: 'connection',
        password: globalState.password,
        type: 'binance',
        id: globalState.session,
        filters: filtersState.filtersForWs,
        favorites: svyazkiState.arrayOfFavoritesIds,
      }))
    };
  
    socket.onmessage = (event) => {
      let msg = JSON.parse(event.data);
  
      switch (msg.method) {
        case 'send':
          console.log('Получено');
          svyazkiState.setSvayzki(msg.data);
          svyazkiState.setFavorites(msg.favorites);
          stopwatchState.setLastUpdate();
          break;
        
        case 'disconnect':
          console.log('Сервер инициировал отключение');
          disconnect();
          console.log('Подключение разорвано сервером');
          console.log('Причина: ' + msg.message);
          break;

        case 'filtersApplied':
          filtersState.setApplied(true);
          console.log('Фильтры приняты сервером');
          break;

        default:
          break;
      }
    };

  };
  
  const initDisconnectByUser = () => {
    console.log('Пользователь инициировал отключение');
    if(socket){
      socket.send(JSON.stringify({
        method: 'disconnect',
        id: globalState.session
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
      socket = null;
      globalState.setWsOnline(false);
      stopwatchState.setRun(false);
      console.log('Остановлен');
    }
  };

  const stopAndNewSession = () => {
    if(globalState.wsOnline) initDisconnectByUser();

    const ns = `f${(+new Date()).toString(16)}`;
    globalState.setSession(ns)
  };

  return {
    connectToServer,
    initDisconnectByUser,
    stopAndNewSession,
  };
}


export default useWsService;