import React from 'react';
import { useState, forwardRef, useImperativeHandle  } from "react";
import StopwatchDisplay from './StopwatchDisplay.js';

const Stopwatch = forwardRef((props, ref) => {
  
  const [running, setRunning] = useState(false);
  const [currentTimeMs, setCurrentTimeMs] = useState(0);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [watch, setWatch] = useState(null);

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
  useImperativeHandle(ref, () => ({
    start(){
      if (!running) {
        setRunning(true);
        setWatch(setInterval(() => pace(), 10));
      }
    },
    stop(){
      setRunning(false);
      clearInterval(watch);
      setCurrentTimeMs(0);
      setCurrentTimeSec(0);
    },
    reset(){
      setCurrentTimeMs(0);
      setCurrentTimeSec(0);
    }
  }));

  const pace = () => {
    setCurrentTimeMs((currentTimeMs) => {
      if (currentTimeMs >= 1000) {
        setCurrentTimeSec((currentTimeSec) => (currentTimeSec + 1));
        return 0;
      }
      return currentTimeMs + 10;
    });
  };

  return (
    <div className={'stopwatch'}>
      <StopwatchDisplay
        currentTimeMs={currentTimeMs}
        currentTimeSec={currentTimeSec}
        formatTime={formatTime}
      />
    </div>
  );
});

export default Stopwatch;
