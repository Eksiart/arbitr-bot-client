import {makeAutoObservable} from "mobx";

import {
  tradeTypesOptions,
  banksOptions,
  coinsOptions
} from '../constants/binance';

class FiltersState {
    filters = {}
    filtersForWs = {}

    coins = [...coinsOptions]
    activeCoins = [...coinsOptions]

    canSend = false

    constructor() {
      makeAutoObservable(this)
      this.createFilters()
      this.filtersForWs = this.filters
    }

    createFilters = () => {
      this.filters = {}

      const filtersFromLocalStorage = localStorage.getItem('filters')
      const activeCoinsFromLocalStorage = localStorage.getItem('activeCoins')
      
      if(filtersFromLocalStorage && activeCoinsFromLocalStorage){
        this.filters = JSON.parse(filtersFromLocalStorage)
        this.activeCoins = JSON.parse(activeCoinsFromLocalStorage)
      }else{
        for(let coin of coinsOptions){
          this.filters[coin] = {
            tradeTypes: [...tradeTypesOptions],
            coins: [...coinsOptions],
            banksBuy: [...banksOptions],
            banksSell: [...banksOptions],
            budget: 100000,
            liquidityBuy: 0,
            liquiditySell: 0,
          }
        }
      }
    }

    changeTradeTypes = (coin, value) => {
      const index = this.filters[coin].tradeTypes.findIndex(e => e.id === value.id);
      if (index === -1) {
        this.filters[coin].tradeTypes.push(value);
      }else{
        this.filters[coin].tradeTypes.splice(index, 1);
      }
      this.canSend = true
    }
    changeCoins = (coin, value) => {
      const index = this.filters[coin].coins.indexOf(value);
      if (index === -1) {
        this.filters[coin].coins.push(value);
      }else{
        this.filters[coin].coins.splice(index, 1);
      }
      this.canSend = true
    }
    changeBanks = (coin, value, buy) => {
      const arr = buy ? this.filters[coin].banksBuy : this.filters[coin].banksSell
      const index = arr.findIndex(e => e.id === value.id);
      if (index === -1) {
        arr.push(value);
      }else{
        arr.splice(index, 1);
      }
      this.canSend = true
    }
    changeBudget = (coin, value) => {
      if (value < 500 || value === '') this.canSend = false
      else this.canSend = true
      this.filters[coin].budget = value
    }
    changeLiquidity = (coin, value, name) => {
      if (value < 0 || value === '') this.canSend = false
      else this.canSend = true
      
      if(name === 'buy'){
        this.filters[coin].liquidityBuy = value
      }else{
        this.filters[coin].liquiditySell = value
      }
    }

    changeActiveCoins = (elem) => {
      if(!this.activeCoins.includes(elem)){
        this.activeCoins.push(elem)
      }else{
        const index = this.activeCoins.indexOf(elem);
        this.activeCoins.splice(index, 1);
      }
      this.canSend = true
    }

    //TODO: ЗАЩИТУ ОТ ДУРАКА, ЕСЛИ ПОМЕНЯЛ И ВРЕНУЛ ВСЕ ОБРАТНО ЗАПРЕТ НА ОТПРАВКУ
    sendFilters = () => {
      if(this.canSend){
        this.canSend = false
        const temp = {}
        for (const coin of this.activeCoins) {
          temp[coin] = this.filters[coin]
        }
        this.filtersForWs = temp
        localStorage.setItem('filters', JSON.stringify(this.filters))
        localStorage.setItem('activeCoins', JSON.stringify(this.activeCoins))
      }
    }
}

export default new FiltersState()