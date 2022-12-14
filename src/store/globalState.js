import {makeAutoObservable} from "mobx";

class GlobalState {
  session = `f${(+new Date()).toString(16)}`;
  password = '';
  wsOnline = false;

  // error = false;
  // errorMessage = "";

  constructor() {
    makeAutoObservable(this)
    const passwordFromStorage = JSON.parse(localStorage.getItem('password'));
    if(passwordFromStorage){
      this.password = passwordFromStorage;
    }
  }

  setSession = () => {
    this.session = `f${(+new Date()).toString(16)}`;
  }
  
  setWsOnline = (value) => {
    this.wsOnline = value;
  }

  setPassword = (value) => {
    this.password = value;
    localStorage.setItem('password', JSON.stringify(value));
  }

  // setError = (value, msg) => {
  //   this.error = value;
  //   this.errorMessage = msg;
  // }
}

export default new GlobalState()