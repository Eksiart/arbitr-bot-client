import {makeAutoObservable} from "mobx";

class SvyazkiState {
  arrayOfSvayzok = []
  arrayOfFavoritesIds = []
  arrayOfFavorites = []

  constructor() {
    makeAutoObservable(this)
    const favoritesIdsFromLocalStorage = localStorage.getItem('favorites')
    if(favoritesIdsFromLocalStorage){
      this.arrayOfFavoritesIds = JSON.parse(favoritesIdsFromLocalStorage)
    }
  }

  deleteFavoriteIds = (value) => {
    this.arrayOfFavoritesIds = this.arrayOfFavoritesIds.filter(num => num !== value)
    localStorage.setItem('favorites', JSON.stringify(this.arrayOfFavoritesIds))
  }
  deleteFavorite = (value) => {
    this.arrayOfFavorites = this.arrayOfFavorites.filter(obj => obj.id !== value)
  }

  pushFavoritesIds = (data) => {
    this.arrayOfFavoritesIds.push(data)
    localStorage.setItem('favorites', JSON.stringify(this.arrayOfFavoritesIds))
  }
  pushFavorites = (data) => {
      this.arrayOfFavorites.push(this.arrayOfSvayzok[data])
  }

  setFavorites = (data) => {
    this.arrayOfFavorites = data;
  }
  setSvayzki = (data) => {
    this.arrayOfSvayzok = data;
  }
}

export default new SvyazkiState()