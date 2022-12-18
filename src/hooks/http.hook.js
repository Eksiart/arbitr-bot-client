// eslint-disable-next-line
import React from 'react';
import { useCallback } from 'react';
import axios from 'axios';

export const useHttp = () => {

  const request = useCallback(async (url, method = 'GET', body = null) => {
  
    try{
      await axios.post(url, body)
      .then(function (response) {
        console.log(response);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    } catch(e){
      throw e;
    }
  }, []);

  return {request};
}