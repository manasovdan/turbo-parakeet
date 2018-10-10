import * as React from 'react';


interface IProps {
    changeDifficulty: (event: React.FormEvent<HTMLSelectElement>) => void,
    isGameFinished: boolean,
    startGame: () => void
}

const GameControllers = (props: IProps) => {
    return (
        <div className="game-board__controllers">
            <select name="difficulty-selector" id="difficulty-selector"
                    disabled={!props.isGameFinished}
                    onChange={props.changeDifficulty}
                    className="game-board__difficulty-select">
                <option value="0">Easy</option>
                <option value="1">Medium</option>
                <option value="2">Hard</option>
            </select>
            <button className="game-board__start-btn" onClick={props.startGame}>Start Game</button>
        </div>
    );
};

export default GameControllers;
