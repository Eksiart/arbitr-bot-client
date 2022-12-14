import React from 'react';
import { Helmet } from "react-helmet";

import ButtonsMenu from '../buttonsMenu/buttonsMenu';
import Stopwatch from '../stopwatch/Stopwatch';
import Svyazki from '../svyazkiList/svyazki';
import Filters from '../filters/filters';

const MainPage = () => {
  return(
    <>
      <Helmet>
        <meta
          name="description"
          content="Внутрибиржевой арбитраж"
          />
        <title>Внутрибиржевой арбитраж</title>
      </Helmet>

      <ButtonsMenu type='binance'/>
      <Filters/>

      <div>
        <Stopwatch/>
      </div>

      <Svyazki
        type='binance'
        columnsArr={[
          'Покупаем',
          'Спот',
          'Подаем',
          'Итог',
        ]}
      />
      
    </>
  )
}

export default MainPage;