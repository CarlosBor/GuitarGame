import React from 'react';

const GameStartButtons = (props) =>{
    //Function that actually fires from the button press
    const selectQuestionFretStart = () =>{
        props.currentGameModeSet("questionFret");
        props.selectQuestionFret();
        props.timePass();
        let activeFrets = document.querySelector("div.fretBoard").querySelectorAll("div.wire.visible>div.fret");
        for (let i=0;i<activeFrets.length;i++){
          activeFrets[i].className += " inGame";
        }
      }

    const selectNoteStart = () =>{
        props.currentGameModeSet("note");
        props.selectQuestionFret();
        props.timePass();
        let activeButtons = document.querySelectorAll("button.selectNoteButtons");
        console.log(activeButtons);
        for(let i=0;i<activeButtons.length;i++){
          activeButtons[i].className +=" inGame";
        }
      }

    //Two buttons, one for finding note in string, other for identifying marked note.
    //Should fire two different functions ¿? Each doing its own thing, ultimately writing into Scores
    //Game Start
    //Option menu is locked
    //Button turns into cancel ¿?
    //prompt is generated (F key in wire 3, what is the note in the sixth fret of first wire?)
    //Time starts running (set an option for time?)
    //Note circle or fretboard becomes clickable as pertinent
    //Success or failure changes score, generates another prompt
    //When time runs out prompt disappears, score is logged, things return to normal
    return(
        <>
            <input type="button" value="Question Fret" className="questionFretButton gameStartButton" onClick={selectQuestionFretStart}/>
            <input type="button" value="Note" className="noteButton gameStartButton" onClick={selectNoteStart}/>
        </>
    )
}

export default GameStartButtons;

// currentQuestionChange = {props.currentQuestionChange}
// currentQuestion = {props.currentQuestion}
// winScore = {props.winScore}
// loseScore = {props.loseScore}
// timePass = {props.timePass}
// selectQuestionFret = {props.selectQuestionFret}
// currentGameModeSet = {props.currentGameModeSet}