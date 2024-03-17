import React from 'react';
import Neck from './Neck';
import SelectNoteButtons from './SelectNoteButtons';

const Board = (props) =>{
        return(
            <>
                <div className="fretBoard">
                    <Neck 
                    fretNumber={props.fretNumber} 
                    wireNumber={props.wireNumber} 
                    tuning={props.tuning} 
                    activeWires={props.activeWires}
                    checkAnswerValue={props.checkAnswerValue}
                    />
                </div>
                <SelectNoteButtons
                checkAnswerValueNote={props.checkAnswerValueNote}
                />
            </>
        )
}

export default Board;