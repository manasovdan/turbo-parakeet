import {inject, observer} from 'mobx-react'
import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import './App.css';
import GameStore from './stores';


interface IAppProps {
    store?: GameStore
}

@inject('store')
@observer
class App extends React.Component<IAppProps, {}> {
    changeDifficulty = (event: React.FormEvent<HTMLSelectElement>) => {
        const store = this.props.store!;
        store.difficulty = parseInt(event.currentTarget.value);
    };

    public render() {
        const store = this.props.store!;
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to "Find the Pair" game</h1>
                </header>
                <p className="App-intro">
                    To start select the difficulty and press "Start Game"
                </p>

                <div className="game-board">
                    <div className="game-board__controllers">
                        <select name="difficulty-selector" id="difficulty-selector"
                                onChange={this.changeDifficulty}
                                className="game-board__difficulty-select">
                            <option value="0">Easy</option>
                            <option value="1">Medium</option>
                            <option value="2">Hard</option>
                        </select>
                        <button className="game-board__start-btn" onClick={store.resetTimer}>Start Game</button>
                    </div>
                    <p className="game-board__countdown">Time left: {store.timer}s</p>
                    is game finished: {store.isGameFinished.toString()}
                    <div className="game-board__cards">
                        cards will be here
                    </div>
                </div>
                <DevTools />
            </div>
        );
    }
}

export default App;
