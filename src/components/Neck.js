import React from 'react';
import Wire from './Wire';


const Neck = (props) =>{
    var wires = [];
    for (var i=0;i<props.wireNumber;i++){
        wires[i] = <Wire 
        fretNumber={props.fretNumber} 
        wireNumber={props.wireNumber}
        tuning={props.tuning[i]} 
        activeToggle={props.activeWires[i]}
        key={i}
        />
    }
    return(
        <>
            {wires}
        </>
    )
}
export default Neck;