import {makeAutoObservable} from "mobx";

class SvyazkiState {
  arrayOfSvayzok = []
  arrayOfFavoritesIds = []
  arrayOfFavorites = []
  type

  constructor() {
    makeAutoObservable(this)
    const favoritesIdsFromLocalStorage = localStorage.getItem('favorites')
    if(favoritesIdsFromLocalStorage){
      this.arrayOfFavoritesIds = JSON.parse(favoritesIdsFromLocalStorage)
    }
  }

  setType = (value) => {
    this.type = value
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

  setFavoritesIds = (data) => {
    this.arrayOfFavoritesIds = data;
    localStorage.setItem('favorites', JSON.stringify(this.arrayOfFavoritesIds))
  }

  setFavorites = (data) => {
    this.arrayOfFavorites = data;
  }
  setSvayzki = (data) => {
    this.arrayOfSvayzok = data;
  }

  clear = () => {
    this.arrayOfFavorites = []
    this.arrayOfFavoritesIds = []
    this.arrayOfSvayzok = []
  }
}

export default new SvyazkiState()