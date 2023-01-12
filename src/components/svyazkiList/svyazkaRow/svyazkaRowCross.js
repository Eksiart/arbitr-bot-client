import React from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import BinanceCell from '../svyazkaCell/binanceCell';
import Stack from '@mui/material/Stack';
import GarantexCell from '../svyazkaCell/garantexCell';

import '../svyazkaCell/offerCell.scss'

const SvyazkaRowCross = ({index, data, onRowClick, type}) => {
  return (
    <TableRow
      hover
      onDoubleClick={() => onRowClick({id: index, realId: data.id})}
      sx={{
        '&.MuiTableRow-root:hover':{
          backgroundColor: 'rgba(201, 210, 25, 0.144)'
        },
      }}
    >

      <TableCell align="center">
        {data.marketFirst === 'binance' 
          ? 
          <BinanceCell 
            cryptoData={data.binance} 
            bankData={data.binanceBank} 
            buy={true} 
            coin={data.binance.coin}
            type={data.binanceType}
          />
          :
          <GarantexCell
            cryptoData={data.rub} 
            bankData={data.garantexBank} 
            buy={true} 
            coin='RUB'
            type={data.garantexType}
          />
        }
      </TableCell>

      <TableCell align="center">
        <SpotCell  
          data={data.garantex} 
          type={data.garantexType}
          coin={data.coin}
          marketFirst={data.marketFirst}
          transferType={data.transferType}
        />
      </TableCell>
      
      <TableCell align="center">
      {data.marketSecond === 'binance' 
          ? 
          <BinanceCell 
            cryptoData={data.binance} 
            bankData={data.binanceBank} 
            buy={true} 
            coin={data.binance.coin}
            type={data.binanceType}
            reverse={true}
          />
          :
          <GarantexCell
            cryptoData={data.rub} 
            bankData={data.garantexBank} 
            buy={true} 
            coin='RUB'
            type={data.garantexType}
            reverse={true}
          />
        }
      </TableCell>

      <TableCell align="center"><ResultCell data={data}/></TableCell>
      
    </TableRow>
  );
}

export default SvyazkaRowCross;

const ResultCell = ({data}) => {
  const color = data.spread > 0 ? 'success' : 'error';
  return(
    <Stack spacing={0}>
      <span className={color} style={{fontWeight: 600, fontSize: 16,}}>{data.profit}</span>
      <span className={color} style={{fontWeight: 600, fontSize: 12}}>{data.spread}%</span>
    </Stack>
  )
}

const SpotCell = ({data, type, coin, marketFirst, transferType}) => {

  const takerOrMaker = type === 'MAKER' ? 'error' : 'success';

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const openUser = (url) => {
    openInNewTab('https://garantex.io/trading/' + url)
  }

  return(
    <Stack 
      spacing={0}
    >
      <span
        style={{fontWeight: 600, fontSize: 16}}
      >
        {transferType.toUpperCase()}
      </span>
      <span 
        onClick={() => openUser(coin.toLowerCase() + 'rub')}
        style={{fontWeight: 600, fontSize: 16}}
        className={"myLink " + takerOrMaker}
      >
        {data.price}
      </span>
      <span style={{fontWeight: 600, fontSize: 12}}>
        {marketFirst === 'binance' && `${coin} → RUB`}
        {marketFirst === 'garantex' && `RUB → ${coin}`}
      </span>
    </Stack>
  )
}