import React from 'react';
import calculateNote from '../util/calculateNote';

const Wire = (props) =>{
    
    const checkAnswer = (event) =>{
        props.checkAnswerValue(event.target.getAttribute('note'));
    }

    let visibilityClass = props.activeToggle ? "visible" : "hidden";
    let notesUsed = [];
    let fretNodes = [];
    for (let i=0;i<props.fretNumber;i++){
        notesUsed[i] = calculateNote(props.tuning,i);
    }

    fretNodes = notesUsed.map((note, index) =>
        <div className="fret" key={index} note={note+" "+props.wireIndex} onClick={checkAnswer}>{note+" "+props.wireIndex}</div>
    );

    return(
        <div className = {"wire "+ visibilityClass} >
          {fretNodes}
        </div>
    )
}  
export default Wire;