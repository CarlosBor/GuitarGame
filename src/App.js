import React from 'react';
import './App.css';
import './style.css'


class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div class="game">
          <div class="board">
            <div>
                <div>{this.renderFret("A")}</div>
                <div>A</div>
                <div>D</div>
                <div>G</div>
                <div>B</div>
                <div>E</div>
            </div>
          </div>
          <div class="options">
              {this.renderOptions(6)}
          </div>
          <div class="score"></div>
      </div>
    );
  }

  renderFret(note){
    return <Fret value={note} />
  }
  renderOptions(wire){
    return <Options value={wire}/>
  }
}

class Fret extends React.Component{
  render(){
    return (
      <div className="fret">{this.props.value}</div>
    )
  }
}

class Options extends React.Component{
  setTuning(event){
    console.log(event.target.value);
  }

  generateTuningDropdown(wire){
    var allNotes = []
    for(var i =0;i<wire;i++){
      allNotes[i] = noteCircle.map((notes)=>
      <option value = {i+","+notes}>{notes}</option>
      )
    }

    var totalNotes = allNotes.map((elements)=>
      <select>
        {elements}
      </select>
    )

    return(
      <div>
        {totalNotes}
      </div>
    )
  }

  render(){
    return (
      <div onChange={this.setTuning.bind(this)}>
        {this.generateTuningDropdown(this.props.value)}
      </div>
      )
  }
}


/*Options tiene que tener un prop o state cuya informacion vaya a game, 
y de ahi pase a board una funcion para su renderizado */
const noteCircle = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

//I need a function that adds a line of divs to div.board, getting their note from their left or from options if there isn't any.
function calculateNote(initialNote, stepNumber){
    //Given a initial note and a number of steps, it returns the note X steps from the initial note.
    initialNote = initialNote.toUpperCase();
    stepNumber = stepNumber + findNote(initialNote);
    while(stepNumber>11){
        stepNumber=stepNumber-12;
    }
    return noteCircle[stepNumber];
}

function findNote(note){
    //Given the notation of a note, returns its index in the note circle
    note = note.toUpperCase();
    let noteIndex;
    try{
        noteIndex = noteCircle.indexOf(note);
    }catch(err){
        console.log("Note not found in circle");
    }
    return noteIndex
}



export default Game;