import React from 'react';
import './App.css';
import './style.css'


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      tuning:["E","B","G","D","A","E"],
      wireNumber:6,
      fretNumber:12,
    };
//    this.handleTuningClick = this.handleTuningClick.bind(this);
  }


  render(){
    return (
      <div class="game">
          <div class="board">
              {this.renderFrets(this.state.fretNumber,this.state.wireNumber,this.state.tuning)}
          </div>
          <div class="options">
              {this.renderTuning(6)}

              {/* render number of frets */
              /* render number of strings */}
          </div>
          <div class="score"></div>
      </div>
    );
  }
  renderFrets(numberOfFrets,numberOfWires,tuning){
    return <Board
      numberOfFrets = {numberOfFrets}
      numberOfWires = {numberOfWires}
      tuning = {tuning}
    />
  }
  renderTuning(wires){
    return <Options 
      amount={wires} 
      onChange={this.handleTuningClick}
    />
  }
  /* React.Component doesn't auto bind methods to itself. You need to bind them yourself */
  /* Option A: Bind them in the constructor, as in this.handleTuningClick = this.handleTuningClick.bind(this); in the constructor of this class*/
  /* Option B: when passed as a prop, pass it as this.handleTuningClick.bind(this) */
  /* Option C: What is displayed here, define the function as an event that executes a function ¿?*/
  handleTuningClick = event => {
    var target = event.target.value.split(",")[0];
    var tunedNote = event.target.value.split(",")[1];
    var newTuning = this.state.tuning.concat();
    newTuning[target] = tunedNote;
    this.setState({
        tuning : newTuning
      }
    )
  }
}

class Board extends React.Component{
  renderWire(numberOfFrets, wireTuning){
    var notesUsed = [];
    var fretNodes = [];
    for (var i=0;i<numberOfFrets;i++){
      notesUsed[i] = calculateNote(wireTuning,i);
    }
    fretNodes = notesUsed.map((note) =>
      <div class="fret" value={note}>{note}</div>
    );
    return(
      <div class="wire">
        {fretNodes}
      </div>
    )
  }

  renderBoard(numberOfFrets, numberOfWires, tuning){
 //Go for horizontal divs filled with frets instead of columns
    var wires = [];
    for (var i=0;i<numberOfWires;i++){
      wires[i] = this.renderWire(numberOfFrets,tuning[i]);
    }
    return(
     <>{wires}</>
    )
  }

  
  render(){
    return(
      <div class="fretBoard">
      {this.renderBoard(this.props.numberOfFrets, this.props.numberOfWires,this.props.tuning)}
      </div>
    )
  }
}

class Options extends React.Component{
  render(){
    return (
      <>
        <TuningSelector
          amount = {this.props.amount}
          onChange = {this.props.onChange}
        />
        <StringNumberSelector/>
      </>
      )
  }
}

class TuningSelector extends React.Component{
    //Maps from the notes array to make 12 <option> nodes, then from that to make the desired amount of <select> nodes with <option> in them
    generateTuningDropdowns(wireNumber){
      var allNotes = [];
      for(var i=0;i<wireNumber;i++){
        allNotes[i] = noteCircle.map((notes)=>
         <option value = {i+","+notes}>{notes}</option>
        )
      }
  
      var totalDropdowns = allNotes.map((elements)=>
        <select value={this.selected} onChange={this.props.onChange}>
          {elements}
        </select>
      )
  
      return(
        <div class="tuningOptions">
          {totalDropdowns}
        </div>
      )
    }


    render(){
      return(
        <>
          {this.generateTuningDropdowns(this.props.amount)}
        </>
      )
    }
}

class StringNumberSelector extends React.Component{
  render(){
    return(
      <div class="testing"></div>
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