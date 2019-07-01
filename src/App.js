import React from 'react';
import './App.css';
import './style.css'


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      tuning:["E","B","G","D","A","E"]
    };
  }


  render(){
    return (
      <div class="game">
          <div class="board">
            <div>
                <div>{this.state.tuning[0]}</div>
                <div>{this.state.tuning[1]}</div>
                <div>{this.state.tuning[2]}</div>
                <div>{this.state.tuning[3]}</div>
                <div>{this.state.tuning[4]}</div>
                <div>{this.state.tuning[5]}</div>
            </div>
          </div>
          <div class="options">
              {this.renderTuning(6)}
          </div>
          <div class="score"></div>
      </div>
    );
  }

  renderFret(note){
    return <Fret value={note} />
  }
  renderTuning(wires){
    return <Options 
      amount={wires} 
      onChange={() => this.clicktest()}
    />
  }

  clicktest(test){
    console.log(test);
  }

  handleTuningClick(event){
    var target = event.target.value.split(",")[0];
    var tunedNote = event.target.value.split(",")[1];
    this.setState(
      state =>{
        var list = state.list.map((element, j) => {
          if (j===target){
            return tunedNote;
          }else{
            return element;
          }
        })
      });

    console.log(target + " " + tunedNote);
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

  /*
  setTuning(event){
    console.log(event.target.value);
  }*/

  //Maps from the notes array to make 12 <option> nodes, then from that to make the desired amount of <select> nodes with <option> in them
  generateTuningDropdowns(wireNumber){
    var allNotes = []
    for(var i=0;i<wireNumber;i++){
      allNotes[i] = noteCircle.map((notes)=>
       <option value = {i+","+notes}>{notes}</option>
      )
    }

    var totalDropdowns = allNotes.map((elements)=>
      <select>
        {elements}
      </select>
    )

    return(
      <div>
        {totalDropdowns}
      </div>
    )
  }

  render(){
    return (
      <div onChange={() => this.props.onChange()}>
        {this.generateTuningDropdowns(this.props.amount)}
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