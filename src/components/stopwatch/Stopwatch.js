import React from 'react';
import {observer} from "mobx-react-lite";
import { useState, useEffect } from "react";

import stopwatchState from '../../store/stopwatchState';

const StopwatchDisplay = observer(() => {
  const [time, setTime] = useState(0);
  const [myInteraval, setMyInterval] = useState(null);

  useEffect(() => {
    return () => {
      if(myInteraval){
        clearInterval(myInteraval);
      }
    }
    // eslint-disable-next-line
}, [])

  useEffect(() => {
    resetStopwatch();
    // eslint-disable-next-line
  }, [stopwatchState.lastUpdate])
  
  useEffect(() => {
    if(stopwatchState.run) startStopwatch();
    else stopStopwatch();
    // eslint-disable-next-line
  }, [stopwatchState.run])

  const startStopwatch = () => {
    resetStopwatch();

    const myInteraval = setInterval(() => {
      setTime((time) => time + 10);
    }, 10);

    setMyInterval(myInteraval);
  }

  const stopStopwatch = () => {
    clearInterval(myInteraval);
  }

  const resetStopwatch = () => {
    setTime(0);
  }

  return (
    <div style={{marginTop: '20px', fontWeight: 'bold'}}>
      <span>Прошло с момента получения информации от сервера: </span>
      <span className="digits">
        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
      </span>
      <span className="digits mili-sec">
        {("0" + ((time / 10) % 100)).slice(-2)}
      </span>
    </div>
  );
})

export default StopwatchDisplay;
