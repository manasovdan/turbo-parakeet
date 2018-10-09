import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import './App.css';
import GameBoard from './containers/GameBoard'


class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to "Find the Pair" game</h1>
                </header>
                <p className="App-intro"> To start select the difficulty and press "Start Game".
                Note: board won't change layout if difficulty change until start game is pressed</p>
                <GameBoard />
                <DevTools />
            </div>
        );
    }
}

export default App;
