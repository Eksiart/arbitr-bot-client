import React from 'react';

import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import Button from '@mui/material/Button';

import SvyazkiList from "../svyazkiList/svyazkiList";

// import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/bg.png'

const MainPage = () => {  

  const [socketState, setSocket] = useState(null);
  const [socketIsOnline, setSocketIsOnline] = useState(false);
  const [arrayOfSvayzok, setSvayzki] = useState([]);

  const connectToServer = () => {
    const socket = new WebSocket(`ws://62.113.104.10:5000/`);
    setSocket(socket);
    socket.onopen = () => {
      console.log('Подключение установлено');
      setSocketIsOnline(true);
      socket.send(JSON.stringify({
        username: 'test',
        method: 'connection',
      }))
    }
    socket.onmessage = (event) => {
      let msg = JSON.parse(event.data);
      switch (msg.method) {
        case 'connection':
          console.log('Успешное подключение к серверу');
          break;
        case 'send':
          // console.log('Получено');
          // console.log(msg.data);
          setSvayzki(msg.data)
          break;
        case 'ping':
          console.log('Получен ping от сервера');
          socket.send(JSON.stringify({method: 'pong'}));
          console.log('Отправлен pong серверу');
          break;
        default:
          break;
      }
    }
  }

  const disconnectFromServer = () => {
    socketState.send(JSON.stringify({
      method: 'disconnect',
    }));
    setSocketIsOnline(false);
    console.log('Подключение разорвано пользователем');
  }

  useEffect(() => {
  }, []);

  return(
    <>
      <Helmet>
        <meta
          name="description"
          content="Terano P2P lab"
          />
        <title>Teran P2P</title>
      </Helmet>
      <Button disabled={socketIsOnline} onClick={connectToServer} variant="contained">Подключиться</Button>
      <Button style={{marginLeft: '10px'}} disabled={!socketIsOnline} onClick={disconnectFromServer} variant="contained">Отключиться</Button>
      <div style={{marginTop: '20px'}} className="svyazki">
        <SvyazkiList arrayOfSvayzok={arrayOfSvayzok}/>
      </div>
      <img className="bg-decoration" src={decoration} alt="background"/>
    </>
  )
}

export default MainPage;