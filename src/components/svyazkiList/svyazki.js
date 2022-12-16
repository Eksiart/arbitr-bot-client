import React from 'react';
import { useState } from 'react';

import SvyazkiList from '../svyazkiList/svyazkiList';

import {observer} from "mobx-react-lite";
import svyazkiState from '../../store/svyazkiState';
import globalState from '../../store/globalState';
import axios from 'axios';

const Svyazki = observer(() => {
  function sendFavoritesIds(arr){
    console.log('Отправляем избранное');

    axios.post('http://localhost:5000/options/binance/favorites', {
      favorites: arr,
      session: globalState.session,
      password: globalState.password,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  function changeFavoritesIds(data){
    let newArray = [...svyazkiState.arrayOfFavoritesIds]
    if(newArray.includes(data.realId)){
      newArray = newArray.filter(id => id !== data.realId);
    }else{
      newArray.push(data.realId);
    }
    sendFavoritesIds(newArray);
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
        />
      </div>

      <div style={{marginTop: '20px', marginBottom: '100px'}} className="svyazki">
        <span>Все</span>
        <SvyazkiList 
          data={svyazkiState.arrayOfSvayzok} 
          onRowClick={changeFavoritesIds} 
          keyName={'all'}
        />
      </div>
    </>
  )
})

export default Svyazki;