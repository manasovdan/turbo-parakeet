import * as React from 'react';
import './App.css';


class App extends React.Component {
    public render() {
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
                                className="game-board__difficulty-select">
                            <option value="0">Easy</option>
                            <option value="1">Medium</option>
                            <option value="2">Hard</option>
                        </select>
                        <button className="game-board__start-btn">Start Game</button>
                    </div>
                    <p className="game-board__countdown">Time left: 30s</p>
                    <div className="game-board__cards">
                        cards will be here
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
