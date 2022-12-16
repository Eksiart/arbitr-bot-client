import {makeAutoObservable} from "mobx";

class GlobalState {
  session = `f${(+new Date()).toString(16)}`;
  password = 'ArdanLubitAliny3459524681XX:][';
  wsOnline = false;

  // error = false;
  // errorMessage = "";

  constructor() {
    makeAutoObservable(this)
  }

  setSession = (value) => {
    this.session = value
  }
  
  setWsOnline = (value) => {
    this.wsOnline = value;
  }

  setPassword = (value) => {
    this.password = value;
  }

  // setError = (value, msg) => {
  //   this.error = value;
  //   this.errorMessage = msg;
  // }
}

export default new GlobalState()