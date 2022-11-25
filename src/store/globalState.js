import {makeAutoObservable} from "mobx";

class GlobalState {
  session = `f${(+new Date()).toString(16)}`;
  wsOnline = false;

  constructor() {
    makeAutoObservable(this)
  }

  setSession = (value) => {
    this.session = value
  }
  
  setWsOnline = (value) => {
    this.wsOnline = value;
  }
}

export default new GlobalState()