import React from 'react';
import { useEffect, useRef } from 'react';

const url = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js'

const jsonObj =    {
  "colorTheme": "light",
  "dateRange": "12M",
  "showChart": false,
  "locale": "ru",
  "largeChartUrl": "",
  "isTransparent": false,
  "showSymbolLogo": true,
  "showFloatingTooltip": false,
  "width": "400",
  "height": "400",
  "tabs": [
    {
      "title": "USDT",
      "symbols": [
        {
          "s": "FX_IDC:USDRUB"
        },
        {
          "s": "BINANCE:BTCUSDT"
        },
        {
          "s": "BINANCE:ETHUSDT"
        },
        {
          "s": "BINANCE:BNBUSDT"
        },
        {
          "s": "BINANCE:BUSDUSDT"
        }
      ],
      "originalTitle": "Indices"
    },
    {
      "title": "BTC/ETH",
      "symbols": [
        {
          "s": "BINANCE:BTCUSD"
        },
        {
          "s": "BINANCE:BTCBUSD"
        },
        {
          "s": "BINANCE:ETHUSD"
        },
        {
          "s": "BINANCE:ETHBTC"
        },
        {
          "s": "BINANCE:ETHBUSD"
        }
      ],
      "originalTitle": "Forex"
    },
    {
      "title": "BNB",
      "symbols": [
        {
          "s": "BINANCE:BNBUSD"
        },
        {
          "s": "BINANCE:BNBBTC"
        },
        {
          "s": "BINANCE:BNBETH"
        }
      ]
    }
  ]
}

const TradingViewOverveiw = ({symbol}) => {
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

export default TradingViewOverveiw;