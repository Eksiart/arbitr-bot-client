import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const SvyazkiList = (props) => {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>T/M</TableCell>
            <TableCell>Ликвид.</TableCell>
            <TableCell align="right">Монета покупки</TableCell>
            <TableCell align="right">Курс покупки</TableCell>
            <TableCell align="right">Банк покупки</TableCell>

            <TableCell align="right">Спот</TableCell>

            <TableCell align="right">T/M</TableCell>
            <TableCell align="right">Ликвид.</TableCell>
            <TableCell align="right">Монета продажи</TableCell>
            <TableCell align="right">Курс продажи</TableCell>
            <TableCell align="right">Банк продажи</TableCell>

            <TableCell align="right">Сперд (б.к.)</TableCell>
            <TableCell align="right">Профит (б.к.)</TableCell>
            
            <TableCell align="right">Сперд</TableCell>
            <TableCell align="right">Профит</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {elems} */}
          {props.arrayOfSvayzok.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.buyType}
              </TableCell>
              <TableCell align="right">{row.crtyptoBuy.liquidity}</TableCell>
              <TableCell align="right">{row.crtyptoBuy.coin}</TableCell>
              <TableCell align="right">{row.crtyptoBuy.price}</TableCell>
              <TableCell align="right">{row.bankFrom.nameRus}</TableCell>

              <TableCell align="right">{row.spot.price}</TableCell>

              <TableCell align="right">{row.sellType}</TableCell>
              <TableCell align="right">{row.crtyptoSell.liquidity}</TableCell>
              <TableCell align="right">{row.crtyptoSell.coin}</TableCell>
              <TableCell align="right">{row.crtyptoSell.price}</TableCell>
              <TableCell align="right">{row.bankTo.nameRus}</TableCell>
              
              <TableCell align="right">{row.spreadWithoutComission}%</TableCell>
              <TableCell align="right">{row.profitWithoutComission}</TableCell>
              
              <TableCell align="right">{row.spread}%</TableCell>
              <TableCell align="right">{row.profit}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SvyazkiList;
