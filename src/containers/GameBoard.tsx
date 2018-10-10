import {inject, observer} from 'mobx-react'
import * as React from 'react';
import Card from '../components/Card'
import {AllStores} from "../index";
import GameStore from "../stores/index";
import {Difficulty, ICard} from "../types/index";
import './GameBoard.css'

const cardImages = ["🐭", "🐰", "🐶", "🐺", "🦊", "🐵", "🐸", "🐯", "🦁", "🦓", "🦒", "🐴", "🐮", "🐷", "🐻", "🐼", "🐲",
    "🦄", "🐱", "🦉", "🦅", "🦇", "🐨", "🐢", "🐊", "🦖", "🦋", "🐞", "🕷", "🐛", "🐜", "🐝"];
const DEFAULT_TIMEOUT = 700;


// Hack for mobx weak typings
interface IGameBoardProps {
    difficulty?: Difficulty,
    gamesPlayed?: number,
    cardsNeededToPlay?: number,
    isGameFinished?: boolean,
    startGame?: () => void,
    finishGame?: () => void,
    timer?: number,
    setDifficulty?: (x: Difficulty) => void
}

interface IGameBoardState {
    cards: ICard[],
    gameWon: boolean,
    openCardIndexes: number[],
    openCardValues: number[],
    matchedCards: number
}

interface IOpenCardIndexesAndValues {
    openCardIndexes: number[],
    openCardValues: number[]
}


const shuffleCards = (cardsNeeded: number) => {
    const halfOfCardImages = cardImages.slice(0, cardsNeeded / 2);
    const allCards = halfOfCardImages.reduce((cardsArray: ICard[], cardImage, index) => {
        // have to double this code to avoid same object issues.
        cardsArray.push({
            image: cardImage,
            isOpen: false,
            matched: false,
            value: index
        });
        cardsArray.push({
            image: cardImage,
            isOpen: false,
            matched: false,
            value: index
        });
        return cardsArray;
    }, []);
    return allCards.sort(() => Math.random() - Math.random());
};

@observer
class GameBoard extends React.Component<IGameBoardProps, IGameBoardState> {
    private clickDisabled: boolean = false;

    constructor(props: IGameBoardProps) {
        super(props);
        this.state = {
            cards: [],
            gameWon: false,
            matchedCards: 0,
            openCardIndexes: [],
            openCardValues: []
        };
    }

    public componentWillReceiveProps(nextProps: IGameBoardProps) {
        const isNewGame = nextProps.gamesPlayed !== this.props.gamesPlayed;
        const difficultyChanged = nextProps.cardsNeededToPlay !== this.props.cardsNeededToPlay;
        const isGameChangedWhileNotPlaying = difficultyChanged && this.props.isGameFinished!;
        if (isNewGame || isGameChangedWhileNotPlaying) {
            this.resetCards(nextProps.cardsNeededToPlay);
        }
    }

    public componentDidMount() {
        this.resetCards();
    }

    private changeDifficulty = (event: React.FormEvent<HTMLSelectElement>) => {
        const props = this.props!;
        props.setDifficulty!(+event.currentTarget.value);
    };

    private resetCards = (cardsNeededToPlay?: number) => {
        const shuffledCards = shuffleCards(cardsNeededToPlay || this.props.cardsNeededToPlay!);
        this.setState({
            cards: shuffledCards,
            gameWon: false,
            matchedCards: 0,
            openCardIndexes: [],
            openCardValues: []
        });
    };

    private checkOpenCards(params: IOpenCardIndexesAndValues) {
        const {openCardIndexes} = params;
        if (openCardIndexes.length < 2) {
            return;
        }
        // need to disable clicks to prevent extra opened cards issue
        if (this.checkCardsForMatch(params)) {
            return;
        }
        this.disableClicks();
        setTimeout(() => {
            const stateCardsCopy: ICard[] = this.state.cards;
            openCardIndexes.forEach(cardIndex => (stateCardsCopy[cardIndex].isOpen = false));
            this.setState({
                cards: stateCardsCopy, openCardIndexes: [],
                openCardValues: []
            });
            this.enableClicks();
        }, DEFAULT_TIMEOUT);
    }

    private checkCardsForMatch(params: IOpenCardIndexesAndValues) {
        const {openCardValues, openCardIndexes} = params;
        if (openCardValues[0] !== openCardValues[1]) {
            return false;
        }
        const matchedCards: number = +this.state.matchedCards + 2;
        if (matchedCards === this.props.cardsNeededToPlay) {
            this.setState({gameWon: true});
            this.props.finishGame!();
            return true;
        }
        const stateCardsCopy: ICard[] = this.state.cards;
        openCardIndexes.forEach(cardIndex => (stateCardsCopy[cardIndex].matched = true));
        this.setState({
            cards: stateCardsCopy,
            matchedCards,
            openCardIndexes: [],
            openCardValues: []
        });
        return true;
    }

    private onCardClick(card: ICard, index: number) {
        if (card.isOpen || this.clickDisabled || this.state.gameWon) {
            return;
        }
        const {openCardIndexes, openCardValues} = this.openCards(index, card);
        this.checkOpenCards({openCardIndexes, openCardValues});
    }

    private openCards(index: number, card: ICard): IOpenCardIndexesAndValues {
        const stateCardsCopy: ICard[] = this.state.cards;
        stateCardsCopy[index].isOpen = true;
        const openCardIndexes: number[] = [...this.state.openCardIndexes, index];
        const openCardValues: number[] = [...this.state.openCardValues, card.value];
        this.setState({
            cards: stateCardsCopy,
            openCardIndexes,
            openCardValues
        });
        return {openCardIndexes, openCardValues};
    }

    private disableClicks() {
        this.clickDisabled = true;
    }

    private enableClicks() {
        this.clickDisabled = false;
    }

    public render() {
        const props = this.props;
        const difficultyName = Difficulty[props.difficulty!];
        const nonPlayingState = this.state.gameWon || props.isGameFinished;
        return (
            <div className={`game-board ${difficultyName}`}>
                <div className="game-board__controllers">
                    <select name="difficulty-selector" id="difficulty-selector"
                            disabled={!props.isGameFinished}
                            onChange={this.changeDifficulty}
                            className="game-board__difficulty-select">
                        <option value="0">Easy</option>
                        <option value="1">Medium</option>
                        <option value="2">Hard</option>
                    </select>
                    <button className="game-board__start-btn" onClick={props.startGame}>Start Game</button>
                </div>
                <p className="game-board__countdown">Time left: {props.timer}s</p>
                {
                    nonPlayingState ? 'Game is finished. Would you like to start a new one?' :
                        (<div className={`cards-board ${difficultyName}`}>
                            {this.state.cards.map((card, index) => (
                                //// tslint:disable-next-line jsx-no-lambda
                                <div onClick={() => this.onCardClick(card, index)} key={`${index}.${card.value}`}>
                                    <Card {...card} />
                                </div>))}
                        </div>)
                }
            </div>
        );
    }
}

//analog of mapStateToProps. Have to pick key by key to watch properies change
const GameBoardConnected = inject((allStores: AllStores): IGameBoardProps => {
    const gameStore = allStores.gameStore as GameStore;
    return {
        cardsNeededToPlay: gameStore.cardsNeededToPlay,
        difficulty: gameStore.difficulty,
        finishGame: gameStore.finishGame,
        gamesPlayed: gameStore.gamesPlayed,
        isGameFinished: gameStore.isGameFinished,
        setDifficulty: gameStore.setDifficulty,
        startGame: gameStore.startGame,
        timer: gameStore.timer
    }
})((props: IGameBoardProps) => (<GameBoard {...props} />));
export default GameBoardConnected;