import {makeAutoObservable} from "mobx";

import {
  tradeTypesOptions as tradeTypesOptionsB,
  banksOptions as banksOptionsB,
  coinsOptions as coinsOptionsB
} from '../constants/binance';

import {
  tradeTypesOptions as tradeTypesOptionsG,
  banksOptions as banksOptionsG,
  coinsSimple as coinsOptionsG,
  level
} from '../constants/garantex';

class FiltersStateCross {
    filters = {}
    filtersForWs = {}

    canSend = false
    canSendHTTP = false

    constructor() {
      makeAutoObservable(this)
      this.createFilters()
      
    }

    createFilters = () => {

      const filtersFromLocalStorage = localStorage.getItem('filtersSimple')
      const filtersForWsFromLocalStorage = localStorage.getItem('filtersForWsSimple')

      if(filtersFromLocalStorage && filtersForWsFromLocalStorage){
        this.filters = JSON.parse(filtersFromLocalStorage)
        this.filtersForWs = JSON.parse(filtersForWsFromLocalStorage)
      }else{
        this.filters = {}
        this.filters.budget = 100000;
        this.filters.tradeTypes = tradeTypesOptionsG
        this.filters.coins = coinsOptionsG;
        this.filters.banksB = banksOptionsB;
        this.filters.banksG = banksOptionsG;
        this.filters.level = 'start';
        this.filtersForWs  = JSON.parse(JSON.stringify(this.filters))
      }
    }

    changeBudget = (value) => {
      this.filters.budget = parseInt(value)
      this.canSend = true;
    }

    changeTradeTypes = (value) => {
      const index = this.filters.tradeTypes.findIndex(e => e.id === value.id);
      if (index === -1) {
        this.filters.tradeTypes.push(value);
      }else{
        this.filters.tradeTypes.splice(index, 1);
      }
      this.canSend = true;
    }

    changeCoins = (value) => {
      const index = this.filters.coins.indexOf(value);
      if (index === -1) {
        this.filters.coins.push(value);
      }else{
        this.filters.coins.splice(index, 1);
      }
      this.canSend = true;
    }

    changeBanks = (market, value) => {
      const arr = market === 'binance' ? this.filters.banksB : this.filters.banksG;
      const index = arr.findIndex(e => e.id === value.id);
      if (index === -1) {
        arr.push(value);
      }else{
        arr.splice(index, 1);
      }
      this.canSend = true;
    }

    changeLevel = (value) => {
      if (level.includes(value)){
        this.filters.level = value;
        this.canSend = true;
      }
    }

    sendFilters = () => {
      if(this.canSend){
        this.filtersForWs = JSON.parse(JSON.stringify(this.filters))
        localStorage.setItem('filtersSimple', JSON.stringify(this.filters))
        localStorage.setItem('filtersForWsSimple', JSON.stringify(this.filtersForWs))
        this.canSend = false;
        this.canSendHTTP = true;
      }
    }

    sendFiltersHTTP = () => {
      this.canSendHTTP = false
    }
}

export default new FiltersStateCross()