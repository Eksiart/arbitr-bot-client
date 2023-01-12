import React from 'react';

import Grid from '@mui/material/Grid';

import './offerCell.scss'

const GarantexCell = ({bankData, cryptoData, reverse, buy, type, coin}) => {

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const openUser = (url) => {
    openInNewTab('https://garantex.io/p2p/' + url)
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
        <div style={{fontWeight: 600}}>GARANTEX</div>
        <div
          onClick={() => openUser(cryptoData.id)}
          className={"myLink " + className}
        >
          {cryptoData.nickName}
        </div>
      </Grid>
      <Grid item xs={3}>
        <div className={takerOrMaker} style={{fontWeight: 600}}>{coin}</div>
      </Grid>
      <Grid item xs={3}>
        <div style={{fontSize: 12}}>
          <div style={{fontSize: 13, fontWeight: 600}}>{bankData.nameRus}</div>
          <div>{parseInt(cryptoData.min)} - {parseInt(cryptoData.max)}</div>
        </div>
      </Grid>
      <Grid item xs={3}>
        <div style={{fontSize: 16, fontWeight: 600}}>{cryptoData.price}</div>
        <div style={{fontSize: 12}}>{parseInt((new Date().getTime() - cryptoData.time)/1000)}c.</div>
      </Grid>
    </Grid>
  )
}

export default GarantexCell;