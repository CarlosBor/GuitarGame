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
      timeRemaining : 60,
      activeWires:[true,true,true,true,true,true,true,true,true],
      currentQuestion: null,
      currentScore: null,
      currentGameMode: null,
      scoreboard: []
      };
  }

  render(){
    return (
      <div class="game">
          <div class="board">
            <div class="gameInfo">
              <div class="question">Point to the fret: {this.state.currentQuestion}</div>
              <div class="score">SCORE: {this.state.currentScore}</div>
              <div class="timeRemaining">TIME: {this.state.timeRemaining}</div>
            </div>
              {this.renderBoard()}
          </div>
          <div class="options">
             {this.renderOptions()}
          </div>
          <div class="scores">
            {this.renderScores()}
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
      checkAnswer = {this.checkAnswer}
    />
  }

  renderOptions(){
    return <Options
      wireNumber={this.state.wireNumber} 
      currentTuning = {this.state.tuning}
      tuningChange={this.tuningChange}
      stringNumberChange={this.stringNumberChange}
      fretNumberChange={this.fretNumberChange}
      activeWires = {this.state.activeWires}
      activeWiresChange = {this.activeWiresChange}
      currentQuestionChange = {this.currentQuestionChange}
      winScore = {this.winScore}
      loseScore = {this.loseScore}
      selectQuestionFret = {this.selectQuestionFret}
      currentQuestion = {this.state.currentQuestion}
      timeRemainingChange = {this.timeRemainingChange}
      timePass = {this.timePass}
      currentGameModeSet = {this.currentGameModeSet}
    />
  }

  renderScores(){
    return <Scores 
    scoreboardSet = {this.scoreboardSet}
    scoreboard = {this.state.scoreboard}
    updateScoreLocalstorage = {this.updateScoreLocalstorage}
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
  fretNumberChange = event => {
    var newFretNumber = parseInt(event.target.value);
    this.setState({
      fretNumber : newFretNumber
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
  
  currentGameModeSet = (mode) => {
    this.setState({
      currentGameMode : mode
    })
  }
  scoreboardSet = (scoreboard) => {
    this.setState({
      scoreboard : scoreboard
    })
  }

  updateScoreLocalstorage = () => {
    var scoreboard = [];
    scoreboard[0] = JSON.parse(localStorage.getItem("note"));
    scoreboard[1] = JSON.parse(localStorage.getItem("questionFret"));
    this.scoreboardSet(scoreboard);
  }

////////TODO: Have to associate the ending of the countdown to saving the score
  timePass = async () => {
    var totalTime = this.state.timeRemaining;
    console.log("Game Start");
    var optionNodes = document.querySelector(".options").querySelectorAll("select, input");
    disableNodes(optionNodes);
    while(this.state.timeRemaining > 0){
      await this.sleep(1000);
      this.timeRemainingSet(this.state.timeRemaining-1);
      console.log("Time tick");
    }
      console.log("Time end");
      var fretNumber = document.querySelectorAll(".inGame").length;
      console.log(fretNumber);
      document.querySelector(".questionNode").classList.remove("questionNode");
      var inGameNodes = document.querySelectorAll(".inGame");
      for (var i=0;i<inGameNodes.length;i++){
        inGameNodes[i].classList.remove("inGame");
      }
      enableNodes(optionNodes);
      this.saveScore(this.state.currentGameMode, fretNumber,totalTime);
      this.currentGameModeSet(null);
      this.timeRemainingSet(document.querySelector(".timeSelector").value);
      this.resetScore();
      orderScores();
  }

  sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  checkAnswer = event => {
    if (!event.target.classList.contains("inGame")){
     return
    }

    if (this.state.currentGameMode == "note"){
      var question = this.state.currentQuestion.split(" ")[0];
    }else{
      var question = this.state.currentQuestion;
    }

    if(event.target.getAttribute("note") == question){
     this.winScore();
    }else{
      this.loseScore();
    }

    document.querySelector(".questionNode").classList.remove("questionNode");
    var activeFrets = document.querySelector("div.fretBoard").querySelectorAll("div.wire.visible>div.fret");
    var randomFret = activeFrets[Math.floor(Math.random() * activeFrets.length)];
    randomFret.classList.add('questionNode');
    this.currentQuestionChange(randomFret.getAttribute("note"));
  }
  
  selectQuestionFret = () =>{
    var activeFrets = document.querySelector("div.fretBoard").querySelectorAll("div.wire.visible>div.fret");
        //Initial question fret
        var randomFret = activeFrets[Math.floor(Math.random() * activeFrets.length)];
        randomFret.classList.add('questionNode');
        this.currentQuestionChange(randomFret.getAttribute("note"));
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
  resetScore = () =>{
    this.setState({
      currentScore : 0
    })
  }
  saveScore = (mode, fretNumber, totalTime) =>{
    var points = parseInt(document.querySelector(".score").innerHTML) || 0;
    totalTime = parseInt(totalTime);
    setScoreLocal(mode, points,fretNumber,totalTime);
    this.updateScoreLocalstorage();
  }
}

class Board extends React.Component{
  constructor(props){
    super(props);
    this.checkAnswer = this.props.checkAnswer;
  }

  renderWire(numberOfFrets, wireTuning, activeToggle, wireNumber){
    var visibilityClass = activeToggle ? "visible" : "hidden";
    var notesUsed = [];
    var fretNodes = [];

    for (var i=0;i<numberOfFrets;i++){
      notesUsed[i] = calculateNote(wireTuning,i);
    }
    fretNodes = notesUsed.map((note) =>
      <div class="fret" note={note+" "+wireNumber} onClick={this.checkAnswer}>{note}</div>
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

  generateSelectNoteButtons(){
    var selectNoteButtons = noteCircle.map((note) =>
    <button class ="selectNoteButtons" note={note} onClick={this.checkAnswer}>{note}</button>
      )
    return(
      <div class="selectNoteDiv">
        {selectNoteButtons}
      </div>
    )
  }

  render(){
    return(
      <>
      <div class="fretBoard">
       {this.renderBoard(this.props.numberOfFrets, this.props.numberOfWires,this.props.currentTuning)}
      </div>
      {this.generateSelectNoteButtons()}
      </>
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
        <FretNumberSelector
          fretNumberChange = {this.props.fretNumberChange}
        />
        <GameStartButtons
          currentQuestionChange = {this.props.currentQuestionChange}
          currentQuestion = {this.props.currentQuestion}
          winScore = {this.props.winScore}
          loseScore = {this.props.loseScore}
          timePass = {this.props.timePass}
          selectQuestionFret = {this.props.selectQuestionFret}
          currentGameModeSet = {this.props.currentGameModeSet}
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
        <input type="checkbox" defaultChecked={this.props.activeWires[index]} className={index} onChange={this.props.activeWiresChange}></input>
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
      <>
      <div class="stringNumberSelector">
        <input type="number" min="1" max="6" defaultValue="6" onChange={this.props.stringNumberChange}/>
        <span>String Number</span>
      </div>
      </>
    )
  }
}

class FretNumberSelector extends React.Component{
  
  render(){
    return(
      <>
      <div class="fretNumberSelector">
        <input type="number" min="1" max="12" defaultValue="12" onChange={this.props.fretNumberChange}/>
        <span>Fret Number</span>
      </div>
      </>
    )
  }
}

class GameStartButtons extends React.Component{
  constructor(props){
    super(props);
    this.selectQuestionFretStart = this.selectQuestionFretStart.bind(this);
    this.selectNoteStart = this.selectNoteStart.bind(this);
    this.timePass = this.props.timePass.bind(this);
    this.selectQuestionFret = this.props.selectQuestionFret;
    this.currentGameModeSet = this.props.currentGameModeSet;
  }

  selectQuestionFretStart(){//Function that actually fires from the button press
    this.currentGameModeSet("questionFret");
    this.selectQuestionFret();
    this.timePass();
    var activeFrets = document.querySelector("div.fretBoard").querySelectorAll("div.wire.visible>div.fret");
    for (var i=0;i<activeFrets.length;i++){
      activeFrets[i].className += " inGame";
    }
  }

  selectNoteStart(){
    this.currentGameModeSet("note");
    this.selectQuestionFret();
    this.timePass();
    var activeButtons = document.querySelectorAll("button.selectNoteButtons");
    console.log(activeButtons);
    for(var i=0;i<activeButtons.length;i++){
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
  render(){
    return(
      <>
      <input type="button" value="Question Fret" class="questionFretButton gameStartButton" onClick={this.selectQuestionFretStart}/>
      <input type="button" value="Note" class="noteButton gameStartButton" onClick={this.selectNoteStart}/>
      </>
    )
  }
}

class TimeSelector extends React.Component{
  render(){
    return(
      <><div class="timeSelectorDiv">
      <select class="timeSelector" onChange={this.props.timeRemainingChange}>
        <option value ="3">3</option>
        <option value="30">30</option>
        <option value="45">45</option>
        <option value="60" selected>60</option>
        <option value="90">90</option>
        <option value="120">120</option>
      </select>
      <span>Time</span>
      </div>
      </>
    )
  }
}


class Scores extends React.Component{

  getScores(arrayinfo){
    if (typeof arrayinfo !== 'undefined' && arrayinfo != null){
      return(
        <>
          {this.renderScore(arrayinfo[0])}
          {this.renderScore(arrayinfo[1])}
          {this.renderScore(arrayinfo[2])}
        </>
      ) 
    }else{
      return(<div>No score</div>)
    }
  }

  renderScore(scoreArray){
    if (typeof scoreArray!=='undefined'){
      return(
        <div>{scoreArray[0]} points with {scoreArray[1]} frets in {scoreArray[2]} seconds</div>
      )
    }else{
      return(
        <div>Empty</div>
      )
    }
  }

  componentDidMount(){
    this.props.updateScoreLocalstorage()
  }

  render(){
    return(
      <>
        <div class="ranking">
        
          <div class="noteScoreBoard"><span class="scoreHeader">noteScoreBoard</span>{this.getScores(this.props.scoreboard[0])}</div>
        
          <div class="questionFretScoreBoard"><span class="scoreHeader">questionFretScoreBoard</span>{this.getScores(this.props.scoreboard[1])}</div>
        </div>
      </>
    )
  }
}
const noteCircle = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

function calculateNote(initialNote="A", stepNumber){
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

function setScoreLocal(option,score,time,fretNumber){
  scoreLocalExists();
  time = parseInt(time);
  var scoreboard = getScoreLocal(option);
  scoreboard.push([score,time,fretNumber]);
  scoreboard.sort(scoreSorter);
  scoreboard = JSON.stringify(scoreboard);
  localStorage.setItem(option,scoreboard);
}

function getScoreLocal(option){
  scoreLocalExists();
  return JSON.parse(localStorage.getItem(option))
}

function orderScores(){
  console.log("Something");
  var noteScore = getScoreLocal("note");
  var questionFretScore = getScoreLocal("questionFret");
  noteScore.sort(scoreSorter);
  questionFretScore.sort(scoreSorter);
  noteScore = JSON.stringify(noteScore);
  questionFretScore = JSON.stringify(questionFretScore);
  localStorage.setItem("note",noteScore);
  localStorage.setItem("questionFret", questionFretScore);
}

function scoreSorter(score1, score2){
  score1 = ((score1[0] * 1.1 * score1[1])/score1[2]);
  score2 = ((score2[0] * 1.1 * score2[1])/score2[2]);
  if (score1>score2){
    return -1;
  }else if (score1<score2){
    return 1;
  }else{
    return 0;
  }
}

function scoreLocalExists(){
  if (!JSON.parse(localStorage.getItem("questionFret"))){
    localStorage.setItem("questionFret",JSON.stringify([]));
  }
  if (!JSON.parse(localStorage.getItem("note"))){
    localStorage.setItem("note",JSON.stringify([]));
  }
}

export default Game;