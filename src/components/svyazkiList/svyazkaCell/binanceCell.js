import React from 'react';

import Grid from '@mui/material/Grid';

import './offerCell.scss'

const BinanceCell = ({bankData, cryptoData, reverse, buy, type, coin}) => {

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const openUser = (url) => {
    openInNewTab('https://p2p.binance.com/ru/advertiserDetail?advertiserNo=' + url)
  }

  const takerOrMaker = type === 'MAKER' ? 'error' : 'success';
  const className = buy ? 'success' : 'error';
  const direction = reverse ? "row-reverse" : "row";

  return(
    <Grid 
      container 
      spacing={1}
      justifyContent="center"
      alignItems="center"
      direction={direction}
    >
      <Grid item xs={3}>
        <div style={{fontWeight: 600}}>BINANCE</div>
        <div
          onClick={() => openUser(cryptoData.userNo)}
          className={"myLink " + className}
        >
          {cryptoData.nickname}
        </div>
      </Grid>
      <Grid item xs={2}>
        <div style={{fontSize: 12}}>
          <div>{cryptoData.orderCount} сделок</div>
          <div>{parseFloat(cryptoData.percent * 100).toFixed(1)}%</div>
        </div>
      </Grid>
      <Grid item xs={2}>
        <div className={takerOrMaker} style={{fontWeight: 600}}>{coin}</div>
      </Grid>
      <Grid item xs={2}>
        <div style={{fontSize: 12}}>
          <div style={{fontSize: 13, fontWeight: 600}}>{bankData.nameRus}</div>
          <div>{cryptoData.minCount} - {cryptoData.maxCount}</div>
          <div>{cryptoData.liquidity}</div>
        </div>
      </Grid>
      <Grid item xs={3}>
        <div style={{fontSize: 16, fontWeight: 600}}>{cryptoData.price}</div>
        <div style={{fontSize: 12}}>{parseInt((new Date().getTime() - cryptoData.time)/1000)}c.</div>
      </Grid>
    </Grid>
  )
}

export default BinanceCell;