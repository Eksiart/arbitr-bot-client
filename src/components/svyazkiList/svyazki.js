import React from 'react';

import SvyazkiList from '../svyazkiList/svyazkiList';

import {observer} from "mobx-react-lite";
import svyazkiState from '../../store/svyazkiState';

const Svyazki = observer(() => {

  function saveFavorite(data) {
    if(!svyazkiState.arrayOfFavoritesIds.includes(data.realId)){
      svyazkiState.pushFavoritesIds(data.realId);
      svyazkiState.pushFavorites(data.id);
      console.log('Связка сохранена в избранное');
    }else{
      console.log('Связка уже есть в избранном');
    }
  }

  function removeFavorite(value) {
    svyazkiState.deleteFavoriteIds(value.realId);
    svyazkiState.deleteFavorite(value.realId);
    console.log('Связка удалена из избранного');
  }

  return(
    <>
      <div style={{marginTop: '20px', marginBottom: '20px'}} className="svyazki">
        <span>Избранное</span>
        <span style={{marginLeft: '10px', fontWeight: 600, color: 'red'}}>СВЯЗКА ПОЯВИТСЯ ТОЛЬКО ПРИ ПОДКЛЮЧЕНИИ</span>
        <span style={{marginLeft: '10px'}}>(c задержкой)</span>
        <span style={{marginLeft: '10px'}}>(добавить/убрать связку можно двойным нажатием)</span>
        <SvyazkiList data={svyazkiState.arrayOfFavorites} onRowClick={removeFavorite} height={{height: 300}}/>
      </div>

      <div style={{marginTop: '20px', marginBottom: '100px'}} className="svyazki">
        <span>Все</span>
        <SvyazkiList data={svyazkiState.arrayOfSvayzok} onRowClick={saveFavorite}/>
      </div>
    </>
  )
})

export default Svyazki;