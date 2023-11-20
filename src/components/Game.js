import React, {useState} from 'react';
import Board from './Board';

const Game = () =>{
    const [tuning, setTuning] = useState(["E","B","G","D","A","E"]);
    const [wireNumber, setWirenumber] = useState(6);
    const [fretNumber, setFretNumber] = useState(12);
    const [timeRemaining, setTimeRemaining] = useState(60);
    const [activeWires, setActiveWires] = useState([true,true,true,true,true,true,true,true,true]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [currentScore, setCurrentScore] = useState(null);
    const [currentGameMode, setCurrentGameMode] = useState(null);
    const [scoreboard, setScoreboard] = useState([]);

    return (
        <div class="game">
            <div class="board">
                <div class="gameInfo">
                    <div class="question">Point to the fret: {currentQuestion}</div>
                    <div class="score">SCORE: {currentScore}</div>
                    <div class="timeRemaining">TIME: {timeRemaining}</div>
                </div>
                <Board fretNumber={fretNumber} wireNumber={wireNumber} tuning={tuning} activeWires={activeWires}/>
            </div>
            {/* <div class="options">
                {this.renderOptions()}
            </div>
            <div class="scores">
                {this.renderScores()}
            </div> */}
        </div>
    );
}

export default Game