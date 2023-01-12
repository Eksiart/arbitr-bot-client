// eslint-disable-next-line
import React from "react";
import { useHttp } from '../hooks/http.hook';

const useRequestsService = (globalState) => {

  const {request} = useHttp();
  // const _apiBase = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL;
  const _apiBase = 'http://api.terran.site/';
  // const _apiBase = 'http://localhost:5000/';

  const sendFiltersS = async (filters, type) => {
    const res = await request(
      `${_apiBase}options/${type}/filters`,
      'POST',
      {
        filters,
        session: globalState.session,
        password: globalState.password,
        type
      }
    );
    return res;
  }

  const sendFavoritesS = async (favorites, type) => {
    const res = await request(
      `${_apiBase}options/${type}/favorites`,
      'POST',
      {
        favorites,
        session: globalState.session,
        password: globalState.password,
        type
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