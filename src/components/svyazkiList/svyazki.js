import React from 'react';

import SvyazkiList from '../svyazkiList/svyazkiList';

import {observer} from "mobx-react-lite";
import svyazkiState from '../../store/svyazkiState';
import globalState from '../../store/globalState';

import useRequestsService from '../../services/RequestsService';

const Svyazki = observer(({type, columnsArr}) => {

  const {sendFavoritesS} = useRequestsService(globalState);

  function changeFavoritesIds(data){
    let newArray = [...svyazkiState.arrayOfFavoritesIds]
    if(newArray.includes(data.realId)){
      newArray = newArray.filter(id => id !== data.realId);
    }else{
      newArray.push(data.realId);
    }
    sendFavoritesS(newArray, type);
    svyazkiState.setFavoritesIds([...newArray]);
  }

  return(
    <>
      <div style={{marginTop: '20px', marginBottom: '20px'}} className="svyazki">
        <span>Избранное</span>
        <span style={{marginLeft: '10px', fontWeight: 600, color: 'red'}}>СВЯЗКА ПОЯВИТСЯ ТОЛЬКО ПРИ ПОДКЛЮЧЕНИИ</span>
        <span style={{marginLeft: '10px'}}>(c задержкой)</span>
        <span style={{marginLeft: '10px'}}>(добавить/убрать связку можно двойным нажатием)</span>
        <SvyazkiList 
          data={svyazkiState.arrayOfFavorites} 
          onRowClick={changeFavoritesIds} 
          height={{height: 300}} 
          keyName={'favorites'}
          type={type}
          dataType={svyazkiState.type}
          columnsArr={columnsArr}
        />
      </div>

      <div style={{marginTop: '20px', marginBottom: '100px'}} className="svyazki">
        <span>Все</span>
        <SvyazkiList 
          data={svyazkiState.arrayOfSvayzok} 
          onRowClick={changeFavoritesIds} 
          keyName={'all'}
          type={type}
          dataType={svyazkiState.type}
          columnsArr={columnsArr}
        />
      </div>
    </>
  )
})

export default Svyazki;