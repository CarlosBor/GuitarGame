import React from "react";
import noteCircle from "../util/noteCircle";


const selectNoteButtons = (props) =>{
  const onClickAnswer = (event) =>{
    props.checkAnswerValueNote(event.target.getAttribute('note'));
  }

    let selectNoteButtons = noteCircle.map((note) =>
        <button class ="selectNoteButtons" note={note} onClick={onClickAnswer}>{note}</button>
    )
    return(
      <div class="selectNoteDiv">
        {selectNoteButtons}
      </div>
    )
}

export default selectNoteButtons;