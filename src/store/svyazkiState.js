import {makeAutoObservable} from "mobx";

class SvyazkiState {
  arrayOfSvayzok = []
  arrayOfFavoritesIds = []
  arrayOfFavorites = []

  constructor() {
    makeAutoObservable(this)
  }

  deleteFavoriteIds(value){
    this.arrayOfFavoritesIds = this.arrayOfFavoritesIds.filter(num => num !== value)
  }
  deleteFavorite(value){
    this.arrayOfFavorites = this.arrayOfFavorites.filter(obj => obj.id !== value)
  }

  setFavoritesIds(data){
    this.arrayOfFavoritesIds = [...this.arrayOfFavoritesIds, data.realId]
  }
  setFavorites(data){
      this.arrayOfFavorites = [...this.arrayOfFavorites, this.arrayOfSvayzok[data.id]]
  }

  setSvayzki(data){
    this.arrayOfSvayzok = data;
  }
}

export default new SvyazkiState()