import React from 'react';

const GameStartButtons = (props) =>{

    const selectQuestionFretStart = () =>{
        props.currentGameModeSet("questionFret");
        props.selectInvisibleQuestionFret();
        props.timePass();
        props.disableNoteButtons();
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
      
    return(
        <>
            <input type="button" value="Question Fret" className="questionFretButton gameStartButton" onClick={selectQuestionFretStart}/>
            <input type="button" value="Note" className="noteButton gameStartButton" onClick={selectNoteStart}/>
        </>
    )
}

export default GameStartButtons;