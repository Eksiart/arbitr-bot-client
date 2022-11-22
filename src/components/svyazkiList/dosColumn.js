import React from 'react';

import IconButton from '@mui/material/IconButton';
import LaunchIcon from '@mui/icons-material/Launch';
import StarIcon from '@mui/icons-material/Star';

const DosColumn = ({userNoBuy, userNoSell}) => {

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const openUser = (url) => {
    openInNewTab('https://p2p.binance.com/ru/advertiserDetail?advertiserNo=' + url)
  }

  return (
    <div>
      <IconButton onClick={() => openUser(userNoBuy)} size="small" color="success">
        <LaunchIcon fontSize="small" />
      </IconButton>
      <IconButton onClick={() => openUser(userNoSell)} size="small" color="error">
        <LaunchIcon fontSize="small" />
      </IconButton>
    </div>
  );
}

export default DosColumn;
