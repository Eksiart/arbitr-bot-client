import React from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import DosColumn from './dosColumn';
const SvyazkaRow = ({index, data, onRowClick}) => {
  return (
    <TableRow
      key={index}
      hover
      onClick={() => onRowClick({id: index, realId: data.id})}
      sx={{
        '&.MuiTableRow-root:hover':{
          backgroundColor: 'rgba(201, 210, 25, 0.144)'
        },
      }}
    >
      <TableCell style={data.buyType === 'MAKER' ? {color: 'rgb(246, 70, 93)'} : {color: 'rgb(14, 203, 129)'}} align="center" component="th" scope="row">{data.buyType}</TableCell>
      <TableCell align="center">{data.crtyptoBuy.coin}</TableCell>
      <TableCell align="center">{data.crtyptoBuy.price}</TableCell>
      <TableCell align="center">{data.crtyptoBuy.liquidity}</TableCell>
      <TableCell align="center">{data.bankFrom.nameRus}</TableCell>

      <TableCell style={{color: '#5468ff'}} align="center">{data.spot.price}</TableCell>

      <TableCell style={data.sellType === 'MAKER' ? {color: 'rgb(246, 70, 93)'} : {color: 'rgb(14, 203, 129)'}} align="center">{data.sellType}</TableCell>
      <TableCell align="center">{data.crtyptoSell.coin}</TableCell>
      <TableCell align="center">{data.crtyptoSell.price}</TableCell>
      <TableCell align="center">{data.crtyptoSell.liquidity}</TableCell>
      <TableCell align="center">{data.bankTo.nameRus}</TableCell>
      
      <TableCell align="center">{data.spreadWithoutComission}%</TableCell>
      <TableCell align="center">{data.profitWithoutComission}</TableCell>
      
      <TableCell align="center">{data.spread}%</TableCell>
      <TableCell align="center">{data.profit}</TableCell>

      <TableCell align="center">
        <DosColumn userNoBuy={data.crtyptoBuy.userNo} userNoSell={data.crtyptoSell.userNo}/>
      </TableCell>
      
    </TableRow>
  );
}

export default SvyazkaRow;
