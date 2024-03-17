import React from 'react';
import Wire from './Wire';

const Neck = (props) =>{
    let wires = [];
    for (let i=0;i<props.wireNumber;i++){
        wires[i] = 
        <Wire 
        fretNumber={props.fretNumber} 
        wireIndex={i+1}
        tuning={props.tuning[i]} 
        activeToggle={props.activeWires[i]}
        key={i}
        checkAnswerValue={props.checkAnswerValue}
        />
    }
    return(
        <>
            {wires}
        </>
    )
}
export default Neck;