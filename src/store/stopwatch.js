import {makeAutoObservable} from "mobx";

class StopwatchState {
    lastUpdateInterval = null

    constructor() {
        makeAutoObservable(this)
    }

    setTimeUpdate(time) {
        this.lastUpdateInterval = time
    }
}

export default new StopwatchState()