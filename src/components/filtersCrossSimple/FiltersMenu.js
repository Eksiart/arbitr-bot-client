import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

import {observer} from "mobx-react-lite";
import filtersStateCross from '../../store/filtersStateCross';

import {
  banksOptions as banksOptionsB,
} from '../../constants/binance';

import {
  tradeTypesOptions as tradeTypesOptionsG,
  banksOptions as banksOptionsG,
  coinsSimple as coinsOptionsG,
  level
} from '../../constants/garantex';

const FiltersMenu = observer((props) => {

  const changeTradeTypes = filtersStateCross.changeTradeTypes;
  const changeCoins = filtersStateCross.changeCoins;
  const changeBanks = filtersStateCross.changeBanks;
  const changeBudget = filtersStateCross.changeBudget;
  const changeLevel = filtersStateCross.changeLevel;

  const renderChipsTradeTypes = () => {
    const thisFilters = filtersStateCross.filters.tradeTypes;
    return tradeTypesOptionsG.map((elem) => {
      const elemUsed = thisFilters.some(e => e.id === elem.id);
      const variant = elemUsed ? "filled" : "outlined";
      const color = elemUsed ? "primary" : "default";
      return (<Chip onClick={() => {changeTradeTypes(elem)}} key={'filterElem' + elem.label} label={elem.label} variant={variant} color={color}/>)
    })
  }
  const renderChipsLevel = () => {
    const thisFilter = filtersStateCross.filters.level;
    return level.map((elem) => {
      const elemUsed = elem === thisFilter
      const variant = elemUsed ? "filled" : "outlined";
      const color = elemUsed ? "primary" : "default";
      return (<Chip onClick={() => {changeLevel(elem)}} key={'filterElem' + elem} label={elem} variant={variant} color={color}/>)
    })
  }
  const renderChipsCoins = () => {
    const thisFilters = filtersStateCross.filters.coins;

    return coinsOptionsG.map((elem) => {
      const elemUsed = thisFilters.includes(elem);
      const variant = elemUsed ? "filled" : "outlined";
      const color = elemUsed ? "primary" : "default";
      return (
        <Chip onClick={() => {changeCoins(elem)}} key={'filterElem' + elem} label={elem} variant={variant} color={color}/>
      )
    })
  }
  const renderChipsBank = (market) => {
    const thisFilters = market === 'binance' ?  filtersStateCross.filters.banksB : filtersStateCross.filters.banksG;
    let banks = market === 'binance' ? banksOptionsB : banksOptionsG;
    return banks.map((elem) => {
      const elemUsed = thisFilters.some(e => e.id === elem.id);
      const variant = elemUsed ? "filled" : "outlined";
      const color = elemUsed ? "primary" : "default";
      return (<Chip onClick={() => {changeBanks(market, elem)}} key={'filterElem' + elem.label} label={elem.label} variant={variant} color={color}/>)
    })
  }
  const onBudgetChange = (event) => {
    changeBudget(event.target.value);
  }

  const chipsTradeTypes = renderChipsTradeTypes();
  const chipsCoins = renderChipsCoins();
  const chipsBanksB = renderChipsBank('binance');
  const chipsBanksG = renderChipsBank('garantex');
  const chipsLevels = renderChipsLevel();

  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-cross`}
      aria-labelledby={`simple-tab-cross`}
    >
      <Box sx={{padding: '10px 20px 20px 20px'}}>

        <Box>
          <Stack direction="row" spacing={2}>
            <Box>
              <TextField
                // disabled={!isActive}
                // error={currentFilters.budget < 1000 || currentFilters.budget === ''}
                name='budget'
                value={filtersStateCross.filters.budget} 
                onChange={onBudgetChange} 
                type="number" 
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                size="small" 
                id="outlined-basic" 
                label="Бюджет" 
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

          <Stack sx={{marginTop: '10px'}} direction="row" spacing={2}>
            <Stack spacing={1}>
              <Box sx={{paddingTop: '5px'}}>Монеты:</Box>
            </Stack>
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
            <Box sx={{paddingTop: '5px'}}>Банки Binance:</Box>
            <Stack
              direction="row" 
              spacing={1}
            >
              {chipsBanksB}
            </Stack>
          </Stack>
        </Box>

        <Divider sx={{marginTop: '10px', marginBottom: '10px'}}/>
        <Divider sx={{marginTop: '10px', marginBottom: '10px'}}/>

        <Box>
          <Stack direction="row" spacing={2}>
            <Box sx={{paddingTop: '5px'}}>Банки Garantex:</Box>
            <Stack
              direction="row" 
              spacing={1}
            >
              {chipsBanksG}
            </Stack>
          </Stack>
        </Box>

        <Divider sx={{marginTop: '10px', marginBottom: '10px'}}/>
        <Divider sx={{marginTop: '10px', marginBottom: '10px'}}/>

        <Box>
          <Stack direction="row" spacing={2}>
            <Box sx={{paddingTop: '5px'}}>Уровень Garantex:</Box>
            <Stack
              direction="row" 
              spacing={1}
            >
              {chipsLevels}
            </Stack>
          </Stack>
        </Box>
      </Box>
    </div>
  );
})

export default FiltersMenu;