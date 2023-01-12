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
  setAll = (type, svyazki, svyazkiFavorites) => {
    this.type = type;
    this.arrayOfSvayzok = svyazki;
    this.arrayOfFavorites = svyazkiFavorites;
  }

  clear = () => {
    this.arrayOfFavorites = []
    this.arrayOfFavoritesIds = []
    this.arrayOfSvayzok = []
  }
}

export default new SvyazkiState()