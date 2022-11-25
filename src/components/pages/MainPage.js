import React from 'react';
import { Helmet } from "react-helmet";

import ButtonsMenu from '../buttonsMenu/buttonsMenu';
import Stopwatch from '../stopwatch/Stopwatch';
import Svyazki from '../svyazkiList/svyazki';

import decoration from '../../resources/img/bg.png';

const MainPage = () => {
  return(
    <>
      <Helmet>
        <meta
          name="description"
          content="Terano P2P lab"
          />
        <title>Teran P2P</title>
      </Helmet>

      <ButtonsMenu/>

      <div>
        <Stopwatch/>
      </div>

      <Svyazki/>
      
      <img className="bg-decoration" src={decoration} alt="background"/>
    </>
  )
}

export default MainPage;