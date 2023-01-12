import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const SvyazkiTableHeader = ({columns}) => {
  return (
    <TableHead>
      <TableRow className=''>
        {columns.map((text, index) => (
          <TableCell style={{fontWeight: 600}} key={'header' + index} align='center'>{text}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default SvyazkiTableHeader;
