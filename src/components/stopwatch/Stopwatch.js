import React from 'react';

const StopwatchDisplay = (props) => {

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
      <span>Секунд прошло с момента получения информации от сервера:</span>
      <div className={'stopwatch__display'}>
        <span>
          {formatTime(props.currentTimeSec)}:
          {formatTime(props.currentTimeMs, 'ms')}
        </span>
      </div>
    </div>
  );
}

export default StopwatchDisplay;
