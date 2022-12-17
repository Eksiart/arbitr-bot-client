// eslint-disable-next-line
import React from 'react';
import { useCallback } from 'react';

export const useHttp = () => {

  const request = useCallback(async (url, method = 'GET', body = null) => {
  
    try{
      const response = await fetch(url, {method, body: JSON.stringify(body)});

      if(!response.ok){
        throw new Error(`Could not fetch ${url}, status ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch(e){
      throw e;
    }
  }, []);

  return {request};
}