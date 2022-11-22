import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const columnsNames = [
  'T/M',
  'Монета покупки',
  'Курс покупки',
  'Объемы',
  'Банк покупки',
  'Спот',
  'T/M',
  'Монета продажи',
  'Курс продажи',
  'Объемы',
  'Банк продажи',
  'Сперд (б.к.)',
  'Профит (б.к.)',
  'Сперд',
  'Профит',
  'Действия',
]


const SvyazkiTableHeader = () => {
  return (
    <TableHead>
      <TableRow className=''>
        {columnsNames.map((text, index) => (
          <TableCell style={{fontWeight: 600}} key={'header' + index} align='center'>{text}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default SvyazkiTableHeader;
