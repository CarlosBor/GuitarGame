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
      activeWires:[true,true,true,true,true,true,true,true,true],
      currentQuestion: null,
      currentScore: null
      };
  }

  render(){
    return (
      <div class="game">
          <div class="board">
            <div class="question">{this.state.currentQuestion}</div>
            <div class="scores">{this.state.currentScore}</div>
              {this.renderBoard()}
          </div>
          <div class="options">
             {this.renderOptions()}
          </div>
          <div class="score">
          </div>
      </div>
    );
  }

  renderBoard(){
    return <Board
      numberOfFrets = {this.state.fretNumber}
      numberOfWires = {this.state.wireNumber}
      currentTuning = {this.state.tuning}
      activeWires = {this.state.activeWires}
    />
  }

  renderOptions(){
    return <Options
      wireNumber={this.state.wireNumber} 
      currentTuning = {this.state.tuning}
      tuningChange={this.tuningChange}
      stringNumberChange={this.stringNumberChange}
      activeWires = {this.state.activeWires}
      activeWiresChange = {this.activeWiresChange}
      currentQuestionChange = {this.currentQuestionChange}
      winScore = {this.winScore}
      loseScore = {this.loseScore}
    />
  }

  /* React.Component doesn't auto bind methods to itself. You need to bind them yourself */
  /* Option A: Bind them in the constructor, as in this.tuningChange = this.tuningChange.bind(this); in the constructor of this class*/
  /* Option B: when passed as a prop, pass it as this.tuningChange.bind(this) */
  /* Option C: What is displayed here, define the function as an event that executes a function ¿?*/
  tuningChange = event => {
    var target = event.target.value.split(",")[0];
    var tunedNote = event.target.value.split(",")[1];
    var newTuning = this.state.tuning.concat();
    newTuning[target] = tunedNote;
    this.setState({
        tuning : newTuning
    })
  }

  stringNumberChange = event => {
    var newWireNumber = parseInt(event.target.value);
    this.setState({
      wireNumber : newWireNumber
    })
  }

  activeWiresChange = event => {
    var newActiveWires = this.state.activeWires.concat();
    newActiveWires[event.target.className] = event.target.checked;
    this.setState({
      activeWires : newActiveWires
    })
  }

  currentQuestionChange = (question) => {
    this.setState({
      currentQuestion : question
    })
  }

  winScore = () =>{
    var newScore = this.state.currentScore + 100;
    this.setState({
      currentScore : newScore
    })
  }
  loseScore = () =>{
    var newScore = this.state.currentScore - 100;
    this.setState({
      currentScore : newScore
    })
  }

}

class Board extends React.Component{
  renderWire(numberOfFrets, wireTuning, activeToggle, wireNumber){
    var visibilityClass = activeToggle ? "visible" : "hidden";
    var notesUsed = [];
    var fretNodes = [];
    for (var i=0;i<numberOfFrets;i++){
      notesUsed[i] = calculateNote(wireTuning,i);
    }
    fretNodes = notesUsed.map((note) =>
      <div class="fret" note={note+" "+wireNumber}>{note}</div>
    );
    return(
      <div className = {"wire "+ visibilityClass} >
        {fretNodes}
      </div>
    )
  }

  renderBoard(numberOfFrets, numberOfWires, tuning){
    var wires = [];
    for (var i=0;i<numberOfWires;i++){
      wires[i] = this.renderWire(numberOfFrets,tuning[i],this.props.activeWires[i],i);
    }
    return(
     <>{wires}</>
    )
  }


  render(){
    return(
      <div class="fretBoard">
       {this.renderBoard(this.props.numberOfFrets, this.props.numberOfWires,this.props.currentTuning)}
      </div>
    )
  }

}

class Options extends React.Component{

  render(){
    return (
      <>
        <TuningSelector
          wireNumber = {this.props.wireNumber}
          tuningChange = {this.props.tuningChange}
          currentTuning = {this.props.currentTuning}
          activeWires = {this.props.activeWires}
          activeWiresChange = {this.props.activeWiresChange}
        />
        <StringNumberSelector
          stringNumberChange = {this.props.stringNumberChange}
        />
        <GameStartButtons
          currentQuestionChange = {this.props.currentQuestionChange}
          winScore = {this.props.winScore}
          loseScore = {this.props.loseScore}
        />
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
      var totalDropdowns = allNotes.map((elements,index)=>
        <>
        <select className={this.props.activeWires[index] ? "visible" : "hidden"} value={this.selected} onChange={this.props.tuningChange} defaultValue={index+","+this.props.currentTuning[index]}>
          {elements}
        </select>
        <input type="checkbox" defaultChecked="true" className={index} onChange={this.props.activeWiresChange}></input>
        </>
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
          {this.generateTuningDropdowns(this.props.wireNumber)}
        </>
      )
    }

}

class StringNumberSelector extends React.Component{
  
  render(){
    return(
      <input type="number" min="1" max="6" defaultValue="6" onChange={this.props.stringNumberChange}/>
    )
  }

}

class GameStartButtons extends React.Component{
  constructor(props){
    super(props);
    this.currentQuestionChange = this.props.currentQuestionChange.bind(this);
    this.selectRandomFret = this.selectRandomFret.bind(this);
    this.loseScore = this.props.loseScore.bind(this);
    this.winScore = this.props.winScore.bind(this);
    this.selectQuestionFret = this.selectQuestionFret.bind(this);
    this.chooseNextFret = this.chooseNextFret.bind(this);
    this.selectRandomFret = this.selectRandomFret.bind(this);
  }

  selectQuestionFret(){//Selects a random fret from those active, sets the "question" (sets a note in one mode, fret and wire on the other)
    var activeFrets = document.querySelector("div.fretBoard").querySelectorAll("div.wire.visible>div.fret");
    //Have to make each fret clickable, all but one should skip and cause loss of points
    var randomFret = null;
    for (var i=0;i<activeFrets.length;i++){
      activeFrets[i].addEventListener("click", this.loseScore);
      activeFrets[i].addEventListener("click", (function(){this.chooseNextFret(activeFrets)}));
    }
    randomFret = this.chooseNextFret(activeFrets,randomFret);
    //Fire a function here to set a variable in state to the "question"
    this.currentQuestionChange(randomFret.getAttribute("note"))
    randomFret.classList.add('questionNode'); 
  }
  chooseNextFret(activeFrets){
    var questionFret = null;
    if (document.querySelector("questionNode") != null){
      questionFret = document.querySelector("questionNode");
      questionFret.removeEventListener("click", this.winScore);
      questionFret.addEventListener("click", this.loseScore);
    }
    var newRandomFret = this.selectRandomFret(activeFrets);
    newRandomFret.removeEventListener("click", this.loseScore);
    newRandomFret.addEventListener("click", this.winScore);
    if (questionFret) questionFret.classList.remove("questionNode");
    newRandomFret.classList.add("questionNode");
    this.currentQuestionChange(newRandomFret.getAttribute("note"))
    return newRandomFret;
  }
  
  selectRandomFret(activeFrets){
    return activeFrets[Math.floor(Math.random() * activeFrets.length)];
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
  render(){
    return(
      <>
      <input type="button" value="Keepo" onClick={this.selectQuestionFret}/>
      <input type="button" value={this.props.currentQuestionChange}/>
      </>
    )
  }

}

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