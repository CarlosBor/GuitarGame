import React from 'react';
import StringNumberSelector from './StringNumberSelector';
import FretNumberSelector from './FretNumberSelector';
import GameStartButtons from './GameStartButtons';
import TimeSelector from './TimeSelector';


const Options = (props) =>{
    return(
        <>
            <StringNumberSelector
            handleWireNumberChange = {props.handleWireNumberChange}
            />
            <FretNumberSelector
            handleFretNumberChange = {props.handleFretNumberChange}
            />
            <GameStartButtons
            currentQuestionChange = {props.currentQuestionChange}
            currentQuestion = {props.currentQuestion}
            winScore = {props.winScore}
            loseScore = {props.loseScore}
            timePass = {props.timePass}
            selectQuestionFret = {props.selectQuestionFret}
            selectInvisibleQuestionFret = {props.selectInvisibleQuestionFret}
            currentGameModeSet = {props.currentGameModeSet}
            disableNoteButtons = {props.disableNoteButtons}
            />
            <TimeSelector
            handleTimeOptionChange = {props.handleTimeOptionChange}
            />
        </>
    )
}

export default Options;