import React from 'react';
import { Helmet } from "react-helmet";

import ButtonsMenu from '../buttonsMenu/buttonsMenu';
import Stopwatch from '../stopwatch/Stopwatch';
import Svyazki from '../svyazkiList/svyazki';
import Filters from '../filtersCrossSimple/filters';

const CrossPage = () => {
  return(
    <>
      <Helmet>
        <meta
          name="description"
          content="Межбиржевой арбитраж"
          />
        <title>Межбиржевой арбитраж</title>
      </Helmet>

      <ButtonsMenu type='simple'/>
      <Filters/>

      <div>
        <Stopwatch/>
      </div>

      <Svyazki
        type='simple'
        columnsArr={[
          'Покупаем',
          'Garantex Market',
          'Подаем',
          'Итог',
        ]}
      />
      
    </>
  )
}

export default CrossPage;