// eslint-disable-next-line
import React from "react";
import { useHttp } from '../hooks/http.hook';

const useRequestsService = (globalState) => {

  const {request} = useHttp();
  const _apiBase = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL;

  const sendFiltersS = async (filters) => {
    const res = await request(
      `${_apiBase}options/binance/filters`,
      'POST',
      {
        filters,
        session: globalState.session,
        password: globalState.password,
      }
    );
    return res;
  }

  const sendFavoritesS = async (favorites) => {
    const res = await request(
      `${_apiBase}options/binance/favorites`,
      'POST',
      {
        favorites,
        session: globalState.session,
        password: globalState.password,
      }
    );
    return res;
  }

  return {
    sendFiltersS, 
    sendFavoritesS,
  };
}

export default useRequestsService;