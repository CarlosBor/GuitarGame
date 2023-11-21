import React, {useState} from 'react';
import Neck from './Neck';
import selectNoteButtons from './selectNoteButtons';

const Board = (props) =>{
        return(
            <>
                <div className="fretBoard">
                    <Neck fretNumber={props.fretNumber} wireNumber={props.wireNumber} tuning={props.tuning} activeWires={props.activeWires}/>
                </div>
                {/* <selectNoteButtons/> */}
            </>
        )
}

export default Board;