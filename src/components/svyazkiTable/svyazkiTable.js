import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';

import DosColumn from './dosColumn';

const classes = {
  flexContainer: 'ReactVirtualizedDemo-flexContainer',
  tableRow: 'ReactVirtualizedDemo-tableRow',
  tableRowHover: 'ReactVirtualizedDemo-tableRowHover',
  tableCell: 'ReactVirtualizedDemo-tableCell',
  noClick: 'ReactVirtualizedDemo-noClick',
  tradeTypeRed: 'TradeType-red',
  tradeTypeGreen: 'TradeType-green',
};

const styles = ({ theme }) => ({
  '& .ReactVirtualized__Table__headerRow': {
    ...(theme.direction === 'rtl' && {
      paddingLeft: '0 !important',
    }),
    ...(theme.direction !== 'rtl' && {
      paddingRight: undefined,
    }),
  },
  [`& .${classes.flexContainer}`]: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  [`& .${classes.tableRow}`]: {
    cursor: 'pointer',
  },
  [`& .${classes.tableRowHover}`]: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  [`& .${classes.tableCell}`]: {
    flex: 1,
  },
  [`& .${classes.noClick}`]: {
    cursor: 'initial',
  },
  [`& .${classes.tradeTypeRed}`]: {
    color: 'rgb(246, 70, 93)',
  },
  [`& .${classes.tradeTypeGreen}`]: {
    color: 'rgb(14, 203, 129)',
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }) => {
    const { onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, rowHeight, onRowClick } = this.props;

    let tradeTypeColor = '';
    if(cellData === 'MAKER') tradeTypeColor = classes.tradeTypeRed;
    else{
      if(cellData === 'TAKER') tradeTypeColor = classes.tradeTypeGreen;
    }

    let dos = false;
    if(typeof cellData === 'object' && cellData !== null){
      dos = true;
    }

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, tradeTypeColor, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? 'right'
            : 'left'
        }
      >
        {dos ? <DosColumn props={cellData}/> : cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { columns, rowHeight, headerHeight, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

function createData(id, svyazka, onRowClick) {
  return { 
    id,
    realId: svyazka.id,
    do: {
      userNoBuy: svyazka.crtyptoBuy.userNo,
      userNoSell: svyazka.crtyptoSell.userNo,
      favorite: onRowClick,
      favor: {
        id,
        realId: svyazka.id,
      },
    },
    buyType: svyazka.buyType,
    buyLiq: svyazka.crtyptoBuy.liquidity,
    buyCoin: svyazka.crtyptoBuy.coin,
    buyCourse: svyazka.crtyptoBuy.price,
    buyBank: svyazka.bankFrom.nameRus,
    spot: svyazka.spot.price,
    sellType: svyazka.sellType,
    sellLiq: svyazka.crtyptoSell.liquidity,
    sellCoin: svyazka.crtyptoSell.coin,
    sellCourse: svyazka.crtyptoSell.price,
    sellBank: svyazka.bankTo.nameRus,
    spreadW: svyazka.spreadWithoutComission,
    profitW: svyazka.profitWithoutComission,
    spread: svyazka.spread,
    profit: svyazka.profit,
  };
}

const VirtualizedTable = styled(MuiVirtualizedTable)(styles);

export default function ReactVirtualizedTable({data, onRowClick, height}) {
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    const newRows = []
    for(let i = 0; i < data.length; i++){
      newRows.push(createData(i, data[i], onRowClick));
    }
    setRows(newRows);
  }, [data]);

  return (
    <Paper style={{ height, width: '100%'}}>
      <VirtualizedTable
        // onRowClick={onRowClick}
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={[
          {
            width: 80,
            label: 'T/M',
            dataKey: 'buyType',
          },
          {
            width: 120,
            label: 'Ликвид.',
            dataKey: 'buyLiq',
            numeric: true,
          },
          {
            width: 60,
            label: 'Монета покупки',
            dataKey: 'buyCoin',
          },
          {
            width: 120,
            label: 'Курс покупки',
            dataKey: 'buyCourse',
            numeric: true,
          },
          {
            width: 150,
            label: 'Банк покупки',
            dataKey: 'buyBank',
          },
          {
            width: 120,
            label: 'Спот',
            dataKey: 'spot',
            numeric: true,
          },
          {
            width: 80,
            label: 'T/M',
            dataKey: 'sellType',
          },
          {
            width: 120,
            label: 'Ликвид.',
            dataKey: 'sellLiq',
            numeric: true,
          },
          {
            width: 60,
            label: 'Монета продажи',
            dataKey: 'sellCoin',
          },
          {
            width: 120,
            label: 'Курс продажи',
            dataKey: 'sellCourse',
            numeric: true,
          },
          {
            width: 150,
            label: 'Банк продажи',
            dataKey: 'sellBank',
          },
          {
            width: 60,
            label: 'Сперд (б.к.)',
            dataKey: 'spreadW',
            numeric: true,
          },
          {
            width: 120,
            label: 'Профит (б.к.)',
            dataKey: 'profitW',
            numeric: true,
          },
          {
            width: 60,
            label: 'Сперд',
            dataKey: 'spread',
            numeric: true,
          },
          {
            width: 120,
            label: 'Профит',
            dataKey: 'profit',
            numeric: true,
          },
          {
            width: 140,
            label: 'Действия',
            dataKey: 'do',
            numeric: true,
          },
        ]}
      />
    </Paper>
  );
}
