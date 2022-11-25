import React from 'react';
import {observer} from "mobx-react-lite";
import { useState, useEffect } from "react";

import stopwatchState from '../../store/stopwatchState';

const StopwatchDisplay = observer(() => {
  const [currentMs, setCurrentMs] = useState(0);
  const [currentSec, setCurrnetSec] = useState(0);
  const [myInteraval, setMyInterval] = useState(null);

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

    const interval = setInterval(() => {
      setCurrentMs((currentMs) => {
        if(currentMs >= 1000){
          setCurrnetSec(currentSec => currentSec + 1);
          return 0;
        }
        return currentMs + 10
      });
    }, 10);

    setMyInterval(interval)
  }

  const stopStopwatch = () => {
    clearInterval(myInteraval);
  }

  const resetStopwatch = () => {
    setCurrentMs(0);
    setCurrnetSec(0);
  }

  const formatTime = (val, ...rest) => {
    let value = val.toString();
    if (value.length < 2) {
      value = '0' + value;
    }
    if (rest[0] === 'ms' && value.length < 3) {
      value = '0' + value;
    }
    return value;
  };

  return (
    <div style={{marginTop: '20px', fontWeight: 'bold'}}>
      <span>Прошло с момента получения информации от сервера:</span>
      <div className={'stopwatch__display'}>
        <span>
          {formatTime(currentSec)}:
          {formatTime(currentMs, 'ms')}
        </span>
      </div>
    </div>
  );
})

export default StopwatchDisplay;
