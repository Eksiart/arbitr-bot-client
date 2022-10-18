import React from 'react';
import { useNavigate , useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";

import Button from '@mui/material/Button';

import SvyazkiList from "../svyazkiList/svyazkiList";
import Stopwatch from '../stopwatch/Stopwatch';

// import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/bg.png'

const MainPage = () => {

  const session = useParams();
  const navigate = useNavigate();
  
  const [socketState, setSocket] = useState(null);
  const [socketIsOnline, setSocketIsOnline] = useState(false);
  const [arrayOfSvayzok, setSvayzki] = useState([]);
  const timerRef = useRef();
  
  useEffect(() => {
    console.log('session: ' + session.id);
    // eslint-disable-next-line 
  }, [session])

  const connectToServer = () => {
    const socket = new WebSocket(`ws://localhost:5000/`); //`ws://62.113.104.10:5000/`
    setSocket(socket);
    socket.onopen = () => {
      console.log('Подключение установлено');
      console.log(`Номер сессии: ${session.id}`);
      setSocketIsOnline(true);

      timerRef.current?.start();

      socket.send(JSON.stringify({
        username: 'test',
        method: 'connection',
        id: session.id,
      }))
    }

    socket.onmessage = (event) => {
      let msg = JSON.parse(event.data);
      switch (msg.method) {
        case 'send':
          console.log('Получено');
          // console.log(msg.data);
          setSvayzki(msg.data);
          timerRef.current?.reset();
          break;
        case 'ping':
          console.log('Получен ping от сервера');
          socket.send(JSON.stringify({method: 'pong', id: session.id}));
          console.log('Отправлен pong серверу');
          break;
        case 'disconnect':
          console.log('Сервер инициировал отключение');
          setSocketIsOnline(false);
          socketState.close();
          timerRef.current?.stop();
          break;
        default:
          break;
      }
    }
  }

  const disconnectFromServer = () => {
    if(socketIsOnline){
      socketState.send(JSON.stringify({
        method: 'disconnect',
        id: session.id
      }));

      setSocketIsOnline(false);
      socketState.close();
      timerRef.current?.stop();

      console.log('Подключение разорвано пользователем');
    }
  }

  const createNewSession = () =>  {
    disconnectFromServer();
    navigate(`/f${(+new Date()).toString(16)}`);
  }

  return(
    <>
      <Helmet>
        <meta
          name="description"
          content="Terano P2P lab"
          />
        <title>Teran P2P</title>
      </Helmet>

      <Button color="error" onClick={createNewSession} variant="contained">Обновить сессию</Button>
      <div style={{marginTop: '10px', fontWeight: 'bold'}}>
        <span>Номер сессии: {session.id}</span>
      </div>

      <div style={{marginTop: '20px'}}>
        <Button disabled={socketIsOnline} onClick={connectToServer} variant="contained">Подключиться</Button>
        <Button style={{marginLeft: '10px'}} disabled={!socketIsOnline} onClick={disconnectFromServer} variant="contained">Отключиться</Button>
        
      </div>

      <Stopwatch ref={timerRef}/>

      <div style={{marginTop: '20px', marginBottom: '100px'}} className="svyazki">
        <SvyazkiList arrayOfSvayzok={arrayOfSvayzok}/>
      </div>
      <img className="bg-decoration" src={decoration} alt="background"/>
    </>
  )
}

export default MainPage;