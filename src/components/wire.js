import React from 'react';
import noteCircle from '../util/noteCircle';

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

function calculateNote(initialNote="A", stepNumber){
    //Given a initial note and a number of steps, it returns the note X steps from the initial note.
    initialNote = initialNote.toUpperCase();
    stepNumber = stepNumber + findNote(initialNote);
    while(stepNumber>11){
        stepNumber=stepNumber-12;
    }
    return noteCircle[stepNumber];
}

const checkAnswer = () =>{
    console.log("Queda verificar respuesta");
}

const Wire = (props) =>{
    var visibilityClass = props.activeToggle ? "visible" : "hidden";
    var notesUsed = [];
    var fretNodes = [];
    for (var i=0;i<props.fretNumber;i++){
        notesUsed[i] = calculateNote(props.tuning,i);
    }

    fretNodes = notesUsed.map((note, index) =>
        <div className="fret" key={index} note={note+" "+props.wireNumber} onClick={checkAnswer}>{note}</div>
    );

    return(
        <div className = {"wire "+ visibilityClass} >
          {fretNodes}
        </div>
    )
}  
export default Wire;