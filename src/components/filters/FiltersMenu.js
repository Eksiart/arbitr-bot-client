import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

import {observer} from "mobx-react-lite";
import filtersState from '../../store/filtersState';

import {
  tradeTypesOptions,
  banksOptions,
  coinsOptions
} from '../../constants/binance';

const FiltersMenu = observer((props) => {
  const { coin } = props;

  const currentFilters = filtersState.filters[coin];
  const isActive = filtersState.activeCoins.includes(coin);

  const changeTradeTypes = filtersState.changeTradeTypes;
  const changeCoins = filtersState.changeCoins;
  const changeBanks = filtersState.changeBanks;
  const changeBudget = filtersState.changeBudget;
  const changeLiquidity = filtersState.changeLiquidity;
  const changeActiveCoins = filtersState.changeActiveCoins;

  const renderChipsTradeTypes = () => {
    const thisFilters = currentFilters.tradeTypes;
    return tradeTypesOptions.map((elem) => {
      const elemUsed = thisFilters.some(e => e.id === elem.id);
      const variant = elemUsed ? "filled" : "outlined";
      const color = elemUsed ? "primary" : "default";
      return (<Chip disabled={!isActive} onClick={() => changeTradeTypes(coin, elem)} key={'filterElem' + elem.label} label={elem.label} variant={variant} color={color}/>)
    })
  }
  const renderChipsCoins = () => {
    const thisFilters = currentFilters.coins;
    return coinsOptions.map((elem) => {
      const elemUsed = thisFilters.includes(elem);
      const variant = elemUsed ? "filled" : "outlined";
      const color = elemUsed ? "primary" : "default";
      return (<Chip disabled={!isActive} onClick={() => changeCoins(coin, elem)} key={'filterElem' + elem} label={elem} variant={variant} color={color}/>)
    })
  }
  const renderChipsBank = (buy) => {
    const thisFilters = buy ? currentFilters.banksBuy : currentFilters.banksSell;
    return banksOptions.map((elem) => {
      const elemUsed = thisFilters.some(e => e.id === elem.id);
      const variant = elemUsed ? "filled" : "outlined";
      const color = elemUsed ? "primary" : "default";
      return (<Chip disabled={!isActive} onClick={() => changeBanks(coin, elem, buy)} key={'filterElem' + elem.label} label={elem.label} variant={variant} color={color}/>)
    })
  }

  const onBudgetChange = (event) => {
    changeBudget(coin, event.target.value);
  }
  const onLiquidityChange = (event) => {
    changeLiquidity(coin, event.target.value, event.target.name);
  }

  const onSwitchChange = (event) => {
    changeActiveCoins(coin);
  }

  const chipsTradeTypes = renderChipsTradeTypes();
  const chipsCoins = renderChipsCoins();
  const chipsBanksBuy = renderChipsBank(true);
  const chipsBanksSell = renderChipsBank(false);

  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-${coin}`}
      aria-labelledby={`simple-tab-${coin}`}
    >
      <Box sx={{padding: '10px 20px 20px 20px'}}>

        <Box>
          <Stack direction="row" spacing={2}>
            <Box>
              <span>Искать:</span>
              <Switch checked={isActive} onChange={onSwitchChange}label="Искать" />
            </Box>
            <Box>
              <TextField
                disabled={!isActive}
                error={currentFilters.budget < 500 || currentFilters.budget === ''}
                name='budget'
                value={currentFilters.budget} 
                onChange={onBudgetChange} 
                type="number" 
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                size="small" 
                id="outlined-basic" 
                label="Бюджет" 
                variant="outlined" 
              />
            </Box>
            <Box>
              <TextField
                disabled={!isActive}
                error={currentFilters.liquidityBuy < 0 || currentFilters.liquidityBuy === ''}
                name='buy'
                value={currentFilters.liquidityBuy} 
                onChange={onLiquidityChange} 
                type="number" 
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                size="small" 
                id="outlined-basic" 
                label="Объем покупки" 
                variant="outlined"
              />
            </Box>
            <Box>
              <TextField
                disabled={!isActive}
                error={currentFilters.liquiditySell < 0 || currentFilters.liquiditySell === ''}
                name='sell'
                value={currentFilters.liquiditySell} 
                onChange={onLiquidityChange} 
                type="number" 
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                size="small" 
                id="outlined-basic" 
                label="Объем продажи" 
                variant="outlined"
              />
            </Box>

          </Stack>
        </Box>

        <Divider sx={{marginTop: '10px', marginBottom: '10px'}}/>

        <Box>
          <Stack direction="row" spacing={2}>
            <Box sx={{paddingTop: '5px'}}>Типы торговли:</Box>
            <Stack
              direction="row" 
              spacing={1}
            >
              {chipsTradeTypes}
            </Stack>
          </Stack>
        </Box>

        <Divider sx={{marginTop: '10px', marginBottom: '10px'}}/>
        <Divider sx={{marginTop: '10px', marginBottom: '10px'}}/>

        <Box>
          <Stack direction="row" spacing={2}>
            <Box sx={{paddingTop: '5px'}}>Монеты:</Box>
            <Stack
              direction="row" 
              spacing={1}
            >
              {chipsCoins}
            </Stack>
          </Stack>
        </Box>

        <Divider sx={{marginTop: '10px', marginBottom: '10px'}}/>
        <Divider sx={{marginTop: '10px', marginBottom: '10px'}}/>

        <Box>
          <Stack direction="row" spacing={2}>
            <Box sx={{paddingTop: '5px'}}>Банки покупки:</Box>
            <Stack
              direction="row" 
              spacing={1}
            >
              {chipsBanksBuy}
            </Stack>
          </Stack>
        </Box>

        <Divider sx={{marginTop: '10px', marginBottom: '10px'}}/>
        <Divider sx={{marginTop: '10px', marginBottom: '10px'}}/>

        <Box>
          <Stack direction="row" spacing={2}>
            <Box sx={{paddingTop: '5px'}}>Банки продажи:</Box>
            <Stack
              direction="row" 
              spacing={1}
            >
              {chipsBanksSell}
            </Stack>
          </Stack>
        </Box>

        <Divider sx={{marginTop: '10px', marginBottom: '10px'}}/>

      </Box>
    </div>
  );
})

export default FiltersMenu;