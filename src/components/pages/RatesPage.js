import React from 'react';
import { Helmet } from "react-helmet";
import TradingViewMini from '../trdaingViewMini/TradingViewMini';
import TradingViewOverveiw from '../tradingViewOverview/TradinfViewOverview';

const symbolsBinance = [
  "BINANCE:USDTRUB",
  "BINANCE:BUSDRUB",
  "BINANCE:BTCRUB",
  "BINANCE:ETHRUB",
  "BINANCE:BNBRUB",
]

const RatesPage = () => {

  const renderWidgets = () => {
    return symbolsBinance.map(elem => (
      <TradingViewMini key={elem} symbol={elem}/>
    ))
  }

  return(
    <>
      <Helmet>
        <meta
          name="description"
          content="Акутальные Курсы"
          />
        <title>Акутальные Курсы</title>
      </Helmet>

      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        {renderWidgets()}
      </div>
      <div style={{marginTop: '20px'}}>
        <TradingViewOverveiw/>
      </div>
    </>
  )
}

export default RatesPage;