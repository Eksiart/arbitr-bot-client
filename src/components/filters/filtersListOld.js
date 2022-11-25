import React from 'react';

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import {
  tradeTypesOptions,
  banksOptions,
  coinsOptions
} from '../../constants/binance';

import './filterList.scss';

const schema = yup.object({
  tradeTypes: yup.array().min(1, 'Выберите минимум один тип').required('Выберите минимум один тип'),
  banks: yup.array().min(1, 'Выберите минимум один банк').required('Выберите минимум один банк'),
  coins: yup.array().min(1, 'Выберите минимум одну монету').required('Выберите минимум одну монету'),
  budget: yup.number().moreThan(-1, 'Число должно быть положительным').integer().required(),
  liquidity: yup.number().moreThan(-1, 'Число должно быть положительным').integer().required(),
}).required();

export default function FiltersList({changeFilters}) {
  const { control, handleSubmit, getValues, formState:{ errors } } = useForm({
    defaultValues: {
      tradeTypes: Object.values(tradeTypesOptions).map(elem => elem.label),
      banks: Object.values(banksOptions).map(elem => elem.label),
      coins: coinsOptions,
      budget: 100000,
      liquidity: 0,
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = () => {
    changeFilters(getValues());
  }

  const myChecked = (valueName, value, obj = false) => {
    if(obj){
      if(getValues()[valueName].find(e => e.label === value)){
        return true;
      }else{
        return false;
      }
    }else{
      return getValues()[valueName].includes(value);
    }
  }

  const myRenderValue = (selected) => {
    let str = '';
    for (let elem of selected){
      str += elem.label + '; ';
    }
    return str;
  }

  return (
    <div style={{marginTop: 20}}>
      <form>
        <Grid 
          container 
          spacing={0}
          direction="row"
          justifyContent="flex-start"
          alignItems="center">

          <Grid item xs={2}>
            <Stack spacing={0} className="filters__stack">
              <InputLabel>Способы торговли</InputLabel>
              <Controller
                render={({ field }) => (
                  <>
                    <Select
                      multiple
                      style={{minWidth: 200, maxWidth: 200, maxHeight: 35}}
                      renderValue={(selected) => selected.join('; ')}
                      {...field}>
                      {tradeTypesOptions.map((option) => (
                        <MenuItem
                          key={option.first + option.second}
                          value={option.label}>
                          <Checkbox checked={myChecked('tradeTypes', option.label)} />
                          <ListItemText primary={option.label} />
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
                control={control}
                name="tradeTypes"
              />
              <div className='filters__error'>
                <p>{errors.tradeTypes?.message}</p>
              </div>
            </Stack>
          </Grid>

          <Grid item xs={2}>
            <Stack spacing={0} className="filters__stack">
              <InputLabel>Монеты</InputLabel>
              <Controller
                render={({ field }) => (
                  <Select
                    multiple
                    style={{maxWidth: 200, minWidth: 200, maxHeight: 35}}
                    renderValue={(selected) => selected.join('; ')}
                    {...field}
                  >
                    {coinsOptions.map((option) => (
                      <MenuItem
                        key={option}
                        value={option}
                      >
                        <Checkbox checked={myChecked('coins', option)} />
                        <ListItemText primary={option} />
                      </MenuItem>
                  ))}
                  </Select>
                )}
                control={control}
                name="coins"
              />
              <div className='filters__error'>
                <p>{errors.coins?.message}</p>
              </div>
            </Stack>
          </Grid>

          <Grid item xs={2}>
            <Stack spacing={0} className="filters__stack">
              <InputLabel>Банки</InputLabel>
              <Controller
                render={({ field }) => (
                  <Select
                    multiple
                    style={{maxWidth: 200, minWidth: 200, maxHeight: 35}}
                    renderValue={(selected) => selected.join('; ')}
                    {...field}
                  >
                    {banksOptions.map((option) => (
                      <MenuItem
                        key={option.name}
                        value={option.label}>
                        <Checkbox checked={myChecked('banks', option.label)} />
                        <ListItemText primary={option.label} />
                      </MenuItem>
                  ))}
                  </Select>
                )}
                control={control}
                name="banks"
              />
              <div className='filters__error'>
                <p>{errors.banks?.message}</p>
              </div>
            </Stack>
          </Grid>

          <Grid item xs={1.3}>
            <Stack spacing={0} className="filters__stack-text-input">
              <InputLabel>Депозит</InputLabel>
              <Controller
                render={({ field }) => (
                  <TextField 
                    type="number"
                    placeholder='Депозит'

                    InputLabelProps={{
                      style: {
                        height: 35,
                      },
                    }}
                  
                    inputProps={{
                        style: {
                          height: 35,
                          padding: '0 14px',
                        },
                    }}
                    {...field}
                  />
                )}
                name="budget"
                control={control}
              />
              <div className='filters__error'>
                <p>{errors.budget?.message ? 'Неверное число' : null}</p>
              </div>
            </Stack>
          </Grid>

          <Grid item xs={1.3}>
            <Stack spacing={0} className="filters__stack-text-input">
              <InputLabel>Ликвидность</InputLabel>
              <Controller
                render={({ field }) => (
                  <TextField 
                    type="number"
                    placeholder='Ликвидность'

                    InputLabelProps={{
                      style: {
                        height: 35,
                        maxWidth: 100,
                        minWidth: 100,
                      },
                    }}
                  
                    inputProps={{
                        style: {
                          height: 35,
                          maxWidth: 100,
                          minWidth: 100,
                          padding: '0 14px',
                        },
                    }}
                    {...field}
                  />
                )}
                name="liquidity"
                control={control}
              />
              <div className='filters__error'>
                <p>{errors.liquidity?.message ? 'Неверное число' : null}</p>
              </div>
            </Stack>
          </Grid>

          <Grid item xs={1.3}>
            <div style={{paddingTop: 20}}>
              <Button onClick={handleSubmit(onSubmit)} variant="contained" color="success">
                Сохранить
              </Button>
            </div>
          </Grid>


        </Grid>
      </form>
    </div>
  );
}

//placeholder="Search Google Maps"