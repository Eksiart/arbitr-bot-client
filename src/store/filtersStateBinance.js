import {makeAutoObservable} from "mobx";

import {
  tradeTypesOptions,
  banksOptions,
  coinsOptions
} from '../constants/binance';

class FiltersStateBinance {
    filters = {}
    activeFiltersStr = {}
    filtersForWs = {}

    coins = [...coinsOptions]
    activeCoins = [...coinsOptions]
    activeCoinsSaved = [...coinsOptions]

    // merchant = false;

    canSend = false
    canSendHTTP = false

    constructor() {
      makeAutoObservable(this)
      this.createFilters()
    }

    createFilters = () => {
      this.filters = {}

      const filtersFromLocalStorage = localStorage.getItem('filters')
      const activeCoinsFromLocalStorage = localStorage.getItem('activeCoins')
      const filtersForWsFromLocalStorage = localStorage.getItem('filtersForWs')
      // const merchantFromLocalStorage = localStorage.getItem('filtersForWs')
      
      if(filtersFromLocalStorage && activeCoinsFromLocalStorage && filtersForWsFromLocalStorage){
        this.filters = JSON.parse(filtersFromLocalStorage)
        this.activeCoins = JSON.parse(activeCoinsFromLocalStorage)
        this.filtersForWs = JSON.parse(filtersForWsFromLocalStorage)
        this.activeFiltersSaved = [...this.activeCoins]
        // this.merchant = JSON.parse(merchantFromLocalStorage)
      }else{
        for(let coin of coinsOptions){
          this.filters[coin] = {
            tradeTypes: [...tradeTypesOptions],
            coins: {},
            banksBuy: [...banksOptions],
            banksSell: [...banksOptions],
            budget: 100000,
            liquidityBuy: 0,
            liquiditySell: 0,
            split: false,
          }

          for(let endCoin of coinsOptions){
            this.filters[coin].coins[endCoin] = {
              budget: 100000,
              budgetBuy: 100000,
              budgetSell: 100000,
              find: true,
            }
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
      this.checkCanSend();
    }
    changeCoins = (coin, value) => {
      this.filters[coin].coins[value].find = !this.filters[coin].coins[value].find;
      this.checkCanSend();
    }
    changeBanks = (coin, value, buy) => {
      const arr = buy ? this.filters[coin].banksBuy : this.filters[coin].banksSell
      const index = arr.findIndex(e => e.id === value.id);
      if (index === -1) {
        arr.push(value);
      }else{
        arr.splice(index, 1);
      }
      this.checkCanSend();
    }
    changeBudgetCoin = (coin, value, endCoin, buy) => {
      if (buy) this.filters[coin].coins[endCoin].budgetBuy = parseInt(value);
      else this.filters[coin].coins[endCoin].budgetSell = parseInt(value);
      this.checkCanSend()
    }
    changeBudget = (coin, value) => {
      this.filters[coin].budget = parseInt(value)
      this.checkCanSend()
    }
    changeLiquidity = (coin, value, name) => {
      if (value < 0 || value === '') this.canSend = false
      else this.canSend = true
      
      if(name === 'buy'){
        this.filters[coin].liquidityBuy = parseInt(value)
      }else{
        this.filters[coin].liquiditySell = parseInt(value)
      }
    }
    changeActiveCoins = (elem) => {
      if(!this.activeCoins.includes(elem)){
        this.activeCoins.push(elem)
      }else{
        const index = this.activeCoins.indexOf(elem);
        this.activeCoins.splice(index, 1);
      }
      this.checkCanSend();
    }
    changeSplit = (coin) => {
      this.filters[coin].split = !this.filters[coin].split;
    }
    // changeMerchant = () => {
    //   this.merchant = !this.merchant
    // }

    checkCanSend = () => {
      let canSendTemp = true;
    
      if(canSendTemp){
        for(const [, firstCoinValue] of Object.entries(this.filters)){
          if(firstCoinValue.budgetBuy < 1000 || firstCoinValue.budgetBUY === '') {
            canSendTemp = false;
            break;
          }
          if(firstCoinValue.budgetSell < 1000 || firstCoinValue.budgetSell === '') {
            canSendTemp = false;
            break;
          }

          if(firstCoinValue.liquidityBuy < 0 || firstCoinValue.liquidityBuy === '') {
            canSendTemp = false;
            break;
          }
  
          if(firstCoinValue.liquiditySell < 0 || firstCoinValue.liquiditySell === '') {
            canSendTemp = false;
            break;
          }
  
          for(const [, secondCoinValue] of Object.entries(firstCoinValue.coins)){
            if (secondCoinValue.budget < 1000 || secondCoinValue.budget === '') {
              canSendTemp = false;
              break;
            }
          }
  
          if(!canSendTemp) break;
        }
      }

      this.canSend = canSendTemp;
    }

    sendFilters = () => {
      if(this.canSend){
        this.canSend = false
        const temp = {}
        // temp.merchant = this.merchant;
        for (const coin of this.activeCoins) {
          temp[coin] = this.filters[coin]
        }
        this.filtersForWs = temp
        this.activeFiltersStr = JSON.stringify(this.filters);
        this.activeCoinsSaved = [...this.activeCoins];
        localStorage.setItem('filters', JSON.stringify(this.filters))
        localStorage.setItem('activeCoins', JSON.stringify(this.activeCoins))
        localStorage.setItem('filtersForWs', JSON.stringify(this.filtersForWs))
        
        this.canSendHTTP = true
        // localStorage.setItem('merchant', JSON.stringify(this.merchant))
      }
    }

    sendFiltersHTTP = () => {
      this.canSendHTTP = false
    }
}

export default new FiltersStateBinance()