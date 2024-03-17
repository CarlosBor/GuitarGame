import React, {useState, useEffect} from 'react';
import Board from './Board';
import Options from './Options';
import Scores from './Scores';

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


    console.log("Rerenders");

    function activeWiresChange(){
        console.log("Implement activeWiresChange");
        // let newActiveWires = activeWires.concat();
        // newActiveWires[event.target.className] = event.target.checked;
        // setActiveWires(newActiveWires);
    }

    function tuningChange(){
        console.log("Implement tuningChange");
        // var target = event.target.value.split(",")[0];
        // var tunedNote = event.target.value.split(",")[1];
        // var newTuning = this.state.tuning.concat();
        // newTuning[target] = tunedNote;
        // setTuning(newTuning);
    }

    function stringNumberChange(){
        console.log("Implement stringNumberChange");
        // var newWireNumber = parseInt(event.target.value);
        // this.setState({
        //   wireNumber : newWireNumber
        // })
    }

    function fretNumberChange(){
        console.log("Implement fretNumberChange");
        // var newFretNumber = parseInt(event.target.value);
        // this.setState({
        //   fretNumber : newFretNumber
        // })
      }
    
      
    function timeRemainingChange(){
        console.log("Implement timeRemainingChange");
        // var newTimeRemaining = parseInt(event.target.value);
        // this.setState({
        //   timeRemaining : newTimeRemaining
        // })
      }

    const currentQuestionChange = (question) =>{
        setTimeRemaining(question);
    }
    const currentGameModeSet=(mode)=>{
        setCurrentGameMode(mode);
    }
    const winScore = () =>{
        var newScore = this.state.currentScore + 100;
        setCurrentScore(newScore);
    }
    const loseScore = () =>{
        var newScore = this.state.currentScore - 100;
        setCurrentScore(newScore);
    }

    const selectQuestionFret = () =>{
        var activeFrets = document.querySelector("div.fretBoard").querySelectorAll("div.wire.visible>div.fret");
        //Initial question fret
        var randomFret = activeFrets[Math.floor(Math.random() * activeFrets.length)];
        randomFret.classList.add('questionNode');
        setCurrentQuestion(randomFret.getAttribute("note"));
    }
    
    ////////TODO: Have to associate the ending of the countdown to saving the score
const timePass = async () => {
    const disableNodes = (nodes) =>{
        for(var i=0;i<nodes.length;i++){
          nodes[i].setAttribute("disabled", "disabled");
        }
      }
      
      const enableNodes = (nodes) =>{
        for(var i=0;i<nodes.length;i++){
          nodes[i].removeAttribute("disabled");
        }
      }
      
      const orderScores = () =>{
        console.log("Something");
        var noteScore = getScoreLocal("note");
        var questionFretScore = getScoreLocal("questionFret");
        noteScore.sort(scoreSorter);
        questionFretScore.sort(scoreSorter);
        noteScore = JSON.stringify(noteScore);
        questionFretScore = JSON.stringify(questionFretScore);
        localStorage.setItem("note",noteScore);
        localStorage.setItem("questionFret", questionFretScore);
    }
    const scoreSorter = (score1, score2) =>{
        score1 = ((score1[0] * 1.1 * score1[1])/score1[2]);
        score2 = ((score2[0] * 1.1 * score2[1])/score2[2]);
        if (score1>score2){
          return -1;
        }else if (score1<score2){
          return 1;
        }else{
          return 0;
        }
      }

      const getScoreLocal = (option) =>{
        scoreLocalExists();
        return JSON.parse(localStorage.getItem(option))
      }

      const scoreLocalExists = () =>{
        if (!JSON.parse(localStorage.getItem("questionFret"))){
          localStorage.setItem("questionFret",JSON.stringify([]));
        }
        if (!JSON.parse(localStorage.getItem("note"))){
          localStorage.setItem("note",JSON.stringify([]));
        }
      }
    var totalTime = timeRemaining;
    console.log("Game Start");
    var optionNodes = document.querySelector(".options").querySelectorAll("select, input");
    disableNodes(optionNodes);


    
      console.log("Time end");
      var fretNumber = document.querySelectorAll(".inGame").length;
      console.log(fretNumber);
      document.querySelector(".questionNode").classList.remove("questionNode");
      var inGameNodes = document.querySelectorAll(".inGame");
      for (var i=0;i<inGameNodes.length;i++){
        inGameNodes[i].classList.remove("inGame");
      }
      enableNodes(optionNodes);
      this.saveScore(currentGameMode, fretNumber, totalTime);
      this.currentGameModeSet(null);
      this.timeRemainingSet(document.querySelector(".timeSelector").value);
      this.resetScore();
      orderScores();
}

    return (
        <div className="game">
            <div className="board">
                <div className="gameInfo">
                    <div className="question">Point to the fret: {currentQuestion}</div>
                    <div className="score">SCORE: {currentScore}</div>
                    <div className="timeRemaining">TIME: {timeRemaining}</div>
                </div>
                <Board fretNumber={fretNumber} wireNumber={wireNumber} tuning={tuning} activeWires={activeWires}/>
            </div>
            <div className="options">
                <Options 
                wireNumber={wireNumber} 
                activeWires={activeWires} 
                activeWiresChange={activeWiresChange} 
                tuningChange={tuningChange} 
                tuning={tuning} 
                stringNumberChange={stringNumberChange}
                fretNumberChange={fretNumberChange}
                selectQuestionFret={selectQuestionFret}
                currentQuestionChange={currentQuestionChange}
                currentQuestion={currentQuestion}
                winScore={winScore}
                loseScore={loseScore}
                timePass={timePass}
                currentGameModeSet={currentGameModeSet}
                timeRemainingChange={timeRemainingChange}
                />
            </div>
            <div className="scores">
                <Scores scoreboard={scoreboard}/>
            </div>
        </div>
    );
}

export default Game

