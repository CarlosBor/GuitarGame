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
      timeRemaining : 2,
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
            <div class="timeRemaining">{this.state.timeRemaining}</div>
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
      currentQuestion = {this.state.currentQuestion}
      timeRemainingChange = {this.timeRemainingChange}
      timePass = {this.timePass}
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
  
  timeRemainingChange = event =>{
    var newTimeRemaining = parseInt(event.target.value);
    this.setState({
      timeRemaining : newTimeRemaining
    })
  }
  currentQuestionChange = (question) => {
    this.setState({
      currentQuestion : question
    })
  }

  timeRemainingSet = (time) => {
    this.setState({
      timeRemaining : time
    })
  }
////////TODO: Have to associate the ending of the countdown to redrawing the board, saving the score and enabling the option menu.
  timePass = async () => {
    console.log("Game Start");
    var optionNodes = document.querySelector(".options").querySelectorAll("select, input");
    disableNodes(optionNodes);
    while(this.state.timeRemaining > 0){
      await this.sleep(1000);
      this.timeRemainingSet(this.state.timeRemaining-1);
      console.log("Time tick");
    }
      console.log("Time end");
      reloadNodes(document.querySelector("div.fretBoard"));
      document.querySelector(".questionNode").classList.remove("questionNode");
      enableNodes(optionNodes);
      //saveScore();

  }

  sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  winScore = () =>{
    var newScore = this.state.currentScore + 100;
    console.log("Win");
    this.setState({
      currentScore : newScore
    })
  }
  loseScore = () =>{
    var newScore = this.state.currentScore - 100;
    console.log("Lose");
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
          currentQuestion = {this.props.currentQuestion}
          winScore = {this.props.winScore}
          loseScore = {this.props.loseScore}
          timePass = {this.props.timePass}
        />
        <TimeSelector
          timeRemainingChange = {this.props.timeRemainingChange}
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
    this.timePass = this.props.timePass.bind(this);

    //Explorar esta opcion, hacer que la funcion se asigne con la informacion de la nota en lugar de usar event y target para poder resasignar la funcion al nodo a voluntad
    this.clickFn = this.chooseNextFret.bind(this);
  }

  selectQuestionFret(){//Function that actually fires from the button press
    console.log("Yes I've fired");
    var activeFrets = document.querySelector("div.fretBoard").querySelectorAll("div.wire.visible>div.fret");
        //Initial question fret
        var randomFret = this.chooseNextFret(activeFrets, null);
    for (var i=0;i<activeFrets.length;i++){
      //console.log(activeFrets[i].getAttribute("note"));
  //Por que se envia un evento del raton en lugar de la nota????????????
      var removeFunction = this.clickFn.bind(null, activeFrets,activeFrets[i].getAttribute("note"));
      console.log(removeFunction.toString())
      console.log(removeFunction);
      activeFrets[i].addEventListener("click", removeFunction);
    }
    //CSS class for testing
    randomFret.classList.add('questionNode'); 
    console.log(document.querySelector(".fret"));
    document.querySelector(".fret").removeEventListener("click",removeFunction);
  }


  chooseNextFret(activeFrets,note){
    console.log(note);
    var questionFret = null;
    //When firing this event from a fret click, handle success and failure.
    if (note != null){
      if ( note == this.props.currentQuestion){
        this.winScore();
        console.log("And wins");
      }else{
        this.loseScore();
        console.log("And loses");
      }
    }
    //CSS class for testing
    if (document.querySelector(".questionNode") != null){
      questionFret = document.querySelector(".questionNode");
      console.log("El anterior era: ");
      console.log(questionFret);
    }
    var newRandomFret = this.selectRandomFret(activeFrets);
    console.log("el random es:");
    console.log(newRandomFret);
    if (questionFret){
      console.log("Does this thing work");
      questionFret.classList.remove("questionNode");
    } 
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
      <input type="button" value="Hm" onClick={this.timePass}/>
      </>
    )
  }

}

class TimeSelector extends React.Component{

  render(){
    return(
      <>
      <select onChange={this.props.timeRemainingChange}>
        <option value="30">30</option>
        <option value="45">45</option>
        <option value="60" selected>60</option>
        <option value="90">90</option>
        <option value="120">120</option>
      </select>
      <span>Seconds</span>
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

function reloadNodes(oldNodes){
  var newNodes = oldNodes.cloneNode(true);
  oldNodes.parentNode.replaceChild(newNodes, oldNodes);
}

function disableNodes(nodes){
  for(var i=0;i<nodes.length;i++){
    nodes[i].setAttribute("disabled", "disabled");
  }
}

function enableNodes(nodes){
  for(var i=0;i<nodes.length;i++){
    nodes[i].removeAttribute("disabled");
  }
}
export default Game;