import {action, computed, observable,runInAction} from 'mobx';
import {Difficulty} from "../types";

const DEFAULT_TIMER = 30;

export default class GameStore {
    @computed
    get difficulty(): Difficulty {
        return this._difficulty;
    }

    set difficulty(value: Difficulty) {
        runInAction(()=> {
            this._difficulty = value;
        })
    }

    @observable
    public timer = DEFAULT_TIMER;
    private _difficulty: Difficulty = 0;

    private countdownTimeout: any;

    @action
    public resetTimer = () => {
        this.timer = DEFAULT_TIMER;
        this.countDown();
    };


    @computed
    get isGameFinished(): boolean {
        return this.timer === 0;
    }

    private runCountdown = () => {
        this.countdownTimeout = setTimeout(this.countDown, 1000);
    };

    @action
    private countDown = () => {
        clearTimeout(this.countdownTimeout);
        if (this.isGameFinished) {
            return;
        }
        this.timer -= 1;
        this.runCountdown();
    }
}
