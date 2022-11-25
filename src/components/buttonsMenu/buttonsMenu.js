import React from 'react';

import Button from '@mui/material/Button';

import {observer} from "mobx-react-lite";
import globalState from '../../store/globalState';
import svyazkiState from '../../store/svyazkiState';
import filtersState from '../../store/filtersState';
import stopwatchState from '../../store/stopwatchState';

import Filters from '../filters/filters';

import useWsService from '../../ws/index'

const ButtonsMenu = observer(() => {

  const {
    connectToServer,
    initDisconnectByUser,
    stopAndNewSession, 
  } = useWsService(globalState, svyazkiState, filtersState, stopwatchState);

  return(
    <>
      <Button color="error" onClick={stopAndNewSession} variant="contained">Обновить сессию</Button>

      <div style={{marginTop: '10px', fontWeight: 'bold'}}>
        <span>Номер сессии: {globalState.session}</span>
      </div>

      <div style={{marginTop: '20px'}}>
        <Button disabled={globalState.wsOnline} onClick={connectToServer} variant="contained">Подключиться</Button>
        <Button style={{marginLeft: '10px'}} disabled={!globalState.wsOnline} onClick={initDisconnectByUser} variant="contained">Отключиться</Button>

        <Filters/>
      </div>
    </>
  )
})

export default ButtonsMenu;