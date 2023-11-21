import React from 'react';
import noteCircle from './../util/noteCircle';

const TuningDropdowns = (props) =>{

    const createOptions = (i) => {
        return noteCircle.map(notes =>
            <option key={`${i},${notes}`} value={`${i},${notes}`}>{notes}</option>
        );
    };

    var allNotes = [];
    for(var i=0;i<props.wireNumber;i++){
        createOptions(i);
    }
    
    let totalDropdowns = allNotes.map((elements,index)=>
        <>
            <select className={props.activeWires[index] ? "visible" : "hidden"} value={this.selected} onChange={props.tuningChange} defaultValue={index+","+props.tuning[index]}>
                {elements}
            </select>
            <input type="checkbox" defaultChecked={props.activeWires[index]} className={index} onChange={props.activeWiresChange}></input>
        </>
    )
    return(
        <div className="tuningOptions">
            {totalDropdowns}
        </div>
    )
}

export default TuningDropdowns;