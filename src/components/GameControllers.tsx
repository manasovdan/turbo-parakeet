import * as React from 'react';

export class GameControllers extends React.Component {
  public render() {
    return (
      <div className="game-board__controllers">
        <select name="difficulty-selector" id="difficulty-selector"
                className="game-board__difficulty-select">
          <option value="0">Easy</option>
          <option value="1">Medium</option>
          <option value="2">Hard</option>
        </select>
        <button className="game-board__start-btn">Start Game</button>
      </div>
    );
  }
}

export default GameControllers;