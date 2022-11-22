import React from 'react';

import IconButton from '@mui/material/IconButton';
import LaunchIcon from '@mui/icons-material/Launch';
import StarIcon from '@mui/icons-material/Star';

const DosColumn = ({props}) => {

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const openBuy = (url) => {
    openInNewTab('https://p2p.binance.com/ru/advertiserDetail?advertiserNo=' + url)
  }

  const openSell = (url) => {
    openInNewTab('https://p2p.binance.com/ru/advertiserDetail?advertiserNo=' + url)
  }

  return (
    <div>
      <IconButton onClick={() => openBuy(props.userNoBuy)} size="small" color="success">
        <LaunchIcon fontSize="small" />
      </IconButton>
      <IconButton onClick={() => openSell(props.userNoSell)} size="small" color="error">
        <LaunchIcon fontSize="small" />
      </IconButton>
      <IconButton onClick={() => props.favorite(props.favor)}  size="small" color="secondary">
        <StarIcon fontSize="small" />
      </IconButton>
    </div>
  );
}

export default DosColumn;
