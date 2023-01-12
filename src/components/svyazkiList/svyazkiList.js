import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import SvyazkaRow from './svyazkaRow/svyazkaRow';
import SvyazkiTableHeader from './header/svyazkiListHeader';

import SvyazkaRowCross from './svyazkaRow/svyazkaRowCross';

import { useTheme } from '@mui/material/styles';

import './svyazkiList.scss'

const SvyazkiList = ({dataType, data, onRowClick, height = null, keyName, columnsArr, type}) => {

  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, value) => {
    setPage(value);
  };
  //TODO
  const renderTableElems = (arrayOfSvayzok, page) => {
    if(arrayOfSvayzok.length > 0){
      let partOfArray = arrayOfSvayzok.slice(page, page + 10);
      if(type === 'binance'){
        return partOfArray.map((data, index) => (
          <SvyazkaRow 
            onRowClick={onRowClick} 
            key={keyName + 'svyazka' + (+index + page * 10)} 
            data={data} 
            index={index + page * 10}
          />
        ))
      }else{
        return partOfArray.map((data, index) => (
          <SvyazkaRowCross 
            onRowClick={onRowClick} 
            key={keyName + 'svyazka' + (+index + page * 10)} 
            data={data} 
            index={index + page * 10}
          />
        ))
      }
    }
  }

  return (
    <>
      <TableContainer sx={height} component={Paper}>
        <Table size='small' className='svyazkiTable' sx={{ minWidth: 650 }} aria-label="simple table">
          <SvyazkiTableHeader columns={columnsArr}/>
          <TableBody>
            {dataType === type ? renderTableElems(data, page) : null}
            {/* {renderTableElems(data, page)} */}
          </TableBody>
          {height || !data ? null :
            <TableFooter>
            <TableRow>
              <TablePagination
                count={data.length}
                rowsPerPage={10}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[]}
                ActionsComponent={TablePaginationActions}
                labelDisplayedRows={({ from, to, count }) => { return `${from}–${to} из ${count}` }}
              />
            </TableRow>
          </TableFooter>
          }
        </Table>
      </TableContainer>
    </>
  );
}

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="Первая страница"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="Предыдущая страница"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Следующая страница"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Последняя страница"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default SvyazkiList;
