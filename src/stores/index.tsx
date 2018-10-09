import {action, computed, observable} from 'mobx';
import {cardsPerDifficulty, Difficulty} from "../types";

const DEFAULT_TIMER = 30;

export default class GameStore {
    @observable
    public timer = DEFAULT_TIMER;
    @observable
    public isGameFinished: boolean = true;
    @observable
    private _gamesPlayed: number = 0;
    @observable
    private _difficulty: Difficulty = 0;
    @observable
    private _cardsNeededToPlay: number = 16;

    private countdownTimeout: any;

    @computed
    get difficulty(): Difficulty {
        return this._difficulty;
    }

    @computed
    get cardsNeededToPlay(): Difficulty {
        return this._cardsNeededToPlay;
    }

    @computed
    get gamesPlayed(): number {
        return this._gamesPlayed;
    }

    @action
    public startGame = () => {
        this._gamesPlayed += 1;
        this.resetTimer();
        this.isGameFinished = false;
        this.countDown();
    };

    @action
    public setDifficulty = (value: Difficulty) => {
        this._difficulty = value;
        const difficultyName = Difficulty[this._difficulty!];
        this._cardsNeededToPlay = cardsPerDifficulty[difficultyName];
    };


    @computed
    get isTimeEnded(): boolean {
        return this.timer === 0;
    }

    @action
    public finishGame() {
        clearTimeout(this.countdownTimeout);
    }

    @action
    private resetTimer() {
        this.timer = DEFAULT_TIMER;
    }

    private runCountdown = () => {
        this.countdownTimeout = setTimeout(this.countDown, 1000);
    };

    @action
    private countDown = () => {
        clearTimeout(this.countdownTimeout);
        if (this.isTimeEnded) {
            return this.isGameFinished = true;
        }
        this.timer -= 1;
        return this.runCountdown();
    };

}
