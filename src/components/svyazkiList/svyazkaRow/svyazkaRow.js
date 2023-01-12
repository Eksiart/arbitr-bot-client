import React from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import BinanceCell from '../svyazkaCell/binanceCell';
import Stack from '@mui/material/Stack';

const SvyazkaRow = ({index, data, onRowClick}) => {
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
        <BinanceCell 
          reverse={false} 
          bankData={data.bankFrom} 
          cryptoData={data.crtyptoBuy}
          buy={true}
          type={data.buyType}
          coin={data.coinBuy}
        />
      </TableCell>

      <TableCell align="center"><SpotCell data={data.spot}/></TableCell>

      <TableCell align="center">
        <BinanceCell 
          reverse={true} 
          bankData={data.bankTo} 
          cryptoData={data.crtyptoSell}
          buy={false}
          type={data.sellType}
          coin={data.coinSell}
        />
      </TableCell>

      <TableCell align="center"><ResultCell data={data}/></TableCell>
      
    </TableRow>
  );
}

export default SvyazkaRow;

const ResultCell = ({data}) => {
  const color = data.spread > 0 ? 'success' : 'error';
  return(
    <Stack spacing={0}>
      <span className={color} style={{fontWeight: 600, fontSize: 16,}}>{data.profit}</span>
      <span className={color} style={{fontWeight: 600, fontSize: 12}}>{data.spread}%</span>
    </Stack>
  )
}

const SpotCell = ({data}) => {
  return(
    <Stack spacing={0}>
      <span style={{fontWeight: 600, fontSize: 16, color: '#5468ff'}}>{data.price}</span>
      <span style={{fontWeight: 600, fontSize: 12}}>{data.first} → {data.second}</span>
    </Stack>
  )
}