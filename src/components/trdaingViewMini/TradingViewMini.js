import React from 'react';
import { useEffect, useRef } from 'react';

const url = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js'

const jsonObj = {
  width: "300",
  height: 220,
  locale: "ru",
  dateRange: "1D",
  colorTheme: "light",
  trendLineColor: "rgba(41, 98, 255, 1)",
  underLineColor: "rgba(41, 98, 255, 0.3)",
  underLineBottomColor: "rgba(41, 98, 255, 0)",
  isTransparent: false,
  autosize: false,
  largeChartUrl: ""
}

const TradingViewMini = ({symbol}) => {
  const _ref = useRef();

  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;
    script.innerHTML = JSON.stringify({...jsonObj, symbol});

    _ref.current.appendChild(script);

    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    }
     // eslint-disable-next-line
  }, []);
  
  return(
    <div className="widget-container">
      <div className="tradingview-widget-container" ref={_ref}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  )
}

export default TradingViewMini;