import React from 'react';

const StopwatchDisplay = (props) => {
  return (
    <div style={{marginTop: '20px', fontWeight: 'bold'}}>
      <span>Секунд прошло с момента получения информации от сервера:</span>
      <div className={'stopwatch__display'}>
        <span>
          {props.formatTime(props.currentTimeSec)}:
          {props.formatTime(props.currentTimeMs, 'ms')}
        </span>
      </div>
    </div>
  );
}

export default StopwatchDisplay;
