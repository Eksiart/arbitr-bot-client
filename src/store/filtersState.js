import {makeAutoObservable} from "mobx";

import {
  tradeTypesOptions,
  banksOptions,
  coinsOptions
} from '../constants/binance';

class FiltersState {
    tradeTypes = [...tradeTypesOptions]
    coins = [...coinsOptions]
    banks = [...banksOptions]
    budget = 100000
    liquidity = 0

    constructor() {
        makeAutoObservable(this)
    }

    setFilters(filters) {
        this.tradeTypes = filters.tradeTypes
        this.coins = filters.coins
        this.banks = filters.banks
        this.budget = filters.budget
        this.liquidity = filters.liquidity
    }
}

export default new FiltersState()