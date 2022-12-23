import {makeAutoObservable} from "mobx";

class GlobalState {
  session = `f${(+new Date()).toString(16)}`;
  password = '';
  wsOnline = false;

  // error = false;
  // errorMessage = "";

  constructor() {
    makeAutoObservable(this)
    const passwordFromStorage = localStorage.getItem('password');
    if(passwordFromStorage){
      this.password = passwordFromStorage;
    }
  }

  setSession = (value) => {
    this.session = value
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