import React, {useState, useEffect} from 'react';
import Board from './components/Board';
import Options from './components/Options';
import { disableNodes, enableNodes } from './util/nodeUtils';
import {reactLocalStorage} from 'reactjs-localstorage';
import './App.css';
import './style.css'

const Game = () =>{
    const [tuning, setTuning] = useState(["E","B","G","D","A","E"]);
    const [wireNumber, setWirenumber] = useState(6);
    const [fretNumber, setFretNumber] = useState(12);
    const [timeRemaining, setTimeRemaining] = useState(60);
    const [optionTime, setOptionTime] = useState(60);
    const [timeRunning, setTimeRunning] = useState(false);
    const [activeWires, setActiveWires] = useState([true,true,true,true,true,true,true,true,true]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [currentScore, setCurrentScore] = useState(0);
    const [currentGameMode, setCurrentGameMode] = useState(null);
    const [questionFretScore, setQuestionFretScore] = useState("Empty");
    const [noteScore, setNoteScore] = useState("Empty");
  
  useEffect(()=>{
    let savedNoteScore = reactLocalStorage.get("noteScore");
    let savedFretScore = reactLocalStorage.get("questionFretScore");
    if(savedNoteScore!==undefined){
      setNoteScore(savedNoteScore);
    }
    if(savedFretScore!==undefined){
      setQuestionFretScore(savedFretScore);
    }
  },[]);

  useEffect(() => {
    if(timeRunning){
      const countdown = setTimeout(() => {
          setTimeRemaining(prevTime => {
              if (prevTime > 0) {
                  return prevTime - 1;
              }else{
                stopCountdown();
              }
              return prevTime;
          });
      }, 1000);
      return () => clearTimeout(countdown);
  }
}, [timeRunning, timeRemaining]);

    const handleTimeOptionChange = (newTime) =>{
      setTimeRemaining(newTime);
      setOptionTime(newTime);
    }

    const startCountdown = () =>{
      setTimeRunning(true);
      setTimeRemaining(optionTime);
      setCurrentScore(0);
      let optionNodes = document.querySelector(".options").querySelectorAll("select, input");
      disableNodes(optionNodes);
    }

    const stopCountdown = () =>{
      setTimeRunning(false);
      console.log("Time end");
      setCurrentQuestion(null);
      let disabledNodes = document.querySelectorAll('[disabled="disabled"]');
      enableNodes(disabledNodes);
      console.log(disabledNodes);
      if(currentGameMode==="note"){
        document.querySelector('.questionNode').classList.remove("questionNode");
        let savedScore = reactLocalStorage.get("noteScore");
        if(savedScore === undefined){
          reactLocalStorage.set("noteScore", currentScore);
        }else{
          if(currentScore>savedScore){
            reactLocalStorage.set("noteScore", currentScore);
            setNoteScore(currentScore);
          }
        }
      }else if(currentGameMode==="questionFret"){
        let savedScore = reactLocalStorage.get("questionFretScore");
        if(savedScore === undefined){
          reactLocalStorage.set("questionFretScore", currentScore);
        }else{
          if(currentScore>savedScore){
            setQuestionFretScore(currentScore);
            reactLocalStorage.set("questionFretScore", currentScore);
          }
        }
      }
    }
    
    const disableNoteButtons = () =>{
      let noteButtons = document.querySelectorAll('.selectNoteButtons');
      disableNodes(noteButtons);
    }

    const handleWireNumberChange = (newWires) =>{
      setWirenumber(newWires);
    }

    const handleFretNumberChange = (newFrets) =>{
      setFretNumber(newFrets);
    }

    const checkAnswerValue = (answerValue) =>{
      if(timeRunning){
        if(answerValue===currentQuestion){
          console.log("Correcto");
          winScore();
          selectInvisibleQuestionFret();
        }else{
          console.log("Incorrecto");
          loseScore();
        } 
      }
    }

    const checkAnswerValueNote = (answerValueNote) =>{
      if(timeRunning){
        if(answerValueNote===currentQuestion.split(' ')[0]){
          console.log("Correcto");
          winScore();
          document.querySelector(".questionNode").classList.remove("questionNode");
          selectQuestionFret();
        }else{
          console.log("Incorrecto");
          loseScore();
        }
      }
    }

    const currentQuestionChange = (question) =>{
        setTimeRemaining(question);
    }
    const currentGameModeSet=(mode)=>{
        setCurrentGameMode(mode);
    }
    const winScore = () =>{
        setCurrentScore(currentScore => currentScore+100);
    }
    const loseScore = () =>{
        setCurrentScore(currentScore => currentScore-100);
    }

    const selectQuestionFret = () =>{
        var activeFrets = document.querySelector("div.fretBoard").querySelectorAll("div.wire.visible>div.fret");
        var randomFret = activeFrets[Math.floor(Math.random() * activeFrets.length)];
        randomFret.classList.add('questionNode');
        console.log(randomFret);
        setCurrentQuestion(randomFret.getAttribute("note"));
    }
    
    const selectInvisibleQuestionFret = () =>{
      var activeFrets = document.querySelector("div.fretBoard").querySelectorAll("div.wire.visible>div.fret");
      var randomFret = activeFrets[Math.floor(Math.random() * activeFrets.length)];
      console.log(randomFret);
      setCurrentQuestion(randomFret.getAttribute("note"));
  }

  const gameStart = () => {
    startCountdown();
  }

    return (
        <div className="game">
            <div className="board">
                <div className="gameInfo">
                    <div className="question">Point to the fret: {currentQuestion}</div>
                    <div className="score">SCORE: {currentScore}</div>
                    <div className="timeRemaining">TIME: {timeRemaining}</div>                    
                </div>
                <Board 
                fretNumber={fretNumber} 
                wireNumber={wireNumber} 
                tuning={tuning} 
                activeWires={activeWires}
                checkAnswerValue={checkAnswerValue}
                checkAnswerValueNote={checkAnswerValueNote}
                />
            </div>
            <div className="options">
                <Options 
                wireNumber={wireNumber} 
                tuning={tuning} 
                handleWireNumberChange={handleWireNumberChange}
                handleFretNumberChange={handleFretNumberChange}
                selectQuestionFret={selectQuestionFret}
                selectInvisibleQuestionFret={selectInvisibleQuestionFret}
                currentQuestionChange={currentQuestionChange}
                currentQuestion={currentQuestion}
                winScore={winScore}
                loseScore={loseScore}
                timePass={gameStart}
                currentGameModeSet={currentGameModeSet}
                handleTimeOptionChange={handleTimeOptionChange}
                disableNoteButtons={disableNoteButtons}
                />
            </div>
            <div className="scoresContainer">
              <div className="scores">
                  <p>Find Fret High Score: {questionFretScore}</p>
                  <p>Find Note High Score: {noteScore}</p>
              </div>
            </div>
        </div>
    );
}

export default Game