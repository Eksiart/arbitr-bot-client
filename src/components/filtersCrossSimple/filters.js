import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import {observer} from "mobx-react-lite";
import filtersState from '../../store/filtersStateCross';
import globalState from '../../store/globalState';

import useRequestsService from '../../services/RequestsService';

import FiltersMenu from './FiltersMenu';

const Filters = observer(() => {

  const {sendFiltersS} = useRequestsService(globalState);

  const sendFilters = () => {
    console.log('Отправляем фильтры');

    if(filtersState.canSendHTTP){
      sendFiltersS(filtersState.filtersForWs, 'simple')
        .then(filtersState.sendFiltersHTTP());
    }
  }

  return (
    <Box sx={{ 
      marginTop: '20px', 
      width: '100%',
      borderRadius: '8px',
      boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
      bgcolor: '#fff',
    }}>
      <Stack
        direction="row"
        // justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{
          paddingTop: '10px',
          paddingBottom: '10px',
          paddingLeft: '10px'
        }}
      >
        <Button 
          disabled={!filtersState.canSendHTTP}
          size="medium" 
          variant="contained" 
          onClick={() => sendFilters()}
        >
          Отправить фильтры
        </Button>

        <Button 
          disabled={!filtersState.canSend}
          size="medium" 
          variant="contained" 
          color="success"
          onClick={filtersState.sendFilters}
        >
          Сохранить фильтры
        </Button>

      </Stack>

      <Divider/>

      <Box sx={{ bgcolor: '#fff' }}>
        <FiltersMenu/>
      </Box>
      
    </Box>
  );
})

export default Filters;