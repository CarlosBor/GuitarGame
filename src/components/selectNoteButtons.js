import React from "react";
import noteCircle from "../util/noteCircle";

const selectNoteButtons = () =>{
    var selectNoteButtons = noteCircle.map((note) =>
        <button class ="selectNoteButtons" note={note} onClick={this.checkAnswer}>{note}</button>
    )
    return(
      <div class="selectNoteDiv">
        {selectNoteButtons}
      </div>
    )
}

export default selectNoteButtons;