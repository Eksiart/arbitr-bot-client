import {makeAutoObservable} from "mobx";

class StopwatchState {
    lastUpdate = 0
    run = false

    constructor() {
        makeAutoObservable(this)
    }

    setLastUpdate = () => {
        this.lastUpdate = new Date().getTime()
    }

    setRun = (value) => {
        this.run = value
    }
}

export default new StopwatchState()