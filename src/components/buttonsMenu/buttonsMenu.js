import React from 'react';
import { useEffect } from 'react';

import Button from '@mui/material/Button';

import {observer} from "mobx-react-lite";

import globalState from '../../store/globalState';
import svyazkiState from '../../store/svyazkiState';
import filtersState from '../../store/filtersStateBinance';
import filtersStateCross from '../../store/filtersStateCross';
import stopwatchState from '../../store/stopwatchState';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useState } from "react";

import useWsService from '../../ws/index'

const ButtonsMenu = observer(({type}) => {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    globalState.setSession()
    return () => {
      if(globalState.wsOnline){
        initDisconnectByUser()
      }
    }
     // eslint-disable-next-line
  }, [])

  let filtersStateForWs;
  switch (type) {
    case 'binance':
      filtersStateForWs = filtersState;
      break;
    case 'simple':
      filtersStateForWs = filtersStateCross;
      break;
    // case 'hard':
    //   filtersStateForWs = 
    //   break;
    default:
      break;
  }
  
  const connect = () => {
    connectToServer(type);
  }

  const {
    connectToServer,
    initDisconnectByUser,
  } = useWsService(globalState, svyazkiState, filtersStateForWs, stopwatchState);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return(
    <Stack direction="row" spacing={2}>
      <Button disabled={globalState.wsOnline} onClick={() => connect()} variant="contained">Подключиться</Button>
      <Button disabled={!globalState.wsOnline} onClick={initDisconnectByUser} variant="contained">Отключиться</Button>
      <TextField
        disabled={globalState.wsOnline}
        id="password"
        sx={{backgroundColor: 'white'}}
        value={globalState.password}
        onChange={e => globalState.setPassword(e.target.value)}
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        size="small"
        InputProps={{ // <-- This is where the toggle button is added.
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                size="small"
                onClick={handleClickShowPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </Stack>
  )
})

export default ButtonsMenu;