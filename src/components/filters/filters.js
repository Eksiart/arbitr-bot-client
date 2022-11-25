import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import {observer} from "mobx-react-lite";
import filtersState from '../../store/filtersState';

import FiltersMenu from './FiltersMenu';

const AntTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: 600,
  marginRight: theme.spacing(1),
  color: 'rgba(0, 0, 0, 0.85)',
  fontFamily: [
    'Roboto',
  ].join(','),
  '&:hover': {
    color: '#40a9ff',
    opacity: 1,
  },
  '&.Mui-selected': {
    color: '#1890ff',
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Filters = observer(() => {
  const [activeCoin, setActiveCoin] = React.useState('USDT');

  const changeTab = (event, newValue) => {
    setActiveCoin(newValue);
  };

  const renderTabs = () => {
    return filtersState.coins.map((coin) => (
      <AntTab key={'filtersTab' + coin} value={coin} label={coin} {...a11yProps(coin)}/>
    ))
  }
  const tabs = renderTabs();

  return (
    <Box sx={{ marginTop: '20px', width: '100%' }}>
      <Button 
        disabled={!filtersState.canSend}
        size="medium" 
        variant="contained" 
        color="success"
        sx={{marginBottom: '10px', position: 'realtive', right: 0}}
        onClick={filtersState.sendFilters}
      >
        Сохранить фильтры
      </Button>

      <Box sx={{ bgcolor: '#fff' }}>
        <AntTabs value={activeCoin} onChange={changeTab}>
          {tabs}
        </AntTabs>
        <FiltersMenu 
          coin={activeCoin} 
        />
      </Box>
      
    </Box>
  );
})

export default Filters;