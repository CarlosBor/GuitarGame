import React from 'react';
import TuningSelector from './TuningSelector';
import StringNumberSelector from './StringNumberSelector';
import FretNumberSelector from './FretNumberSelector';
import GameStartButtons from './GameStartButtons';
import TimeSelector from './TimeSelector';


const Options = (props) =>{
    return(
        <>
            <TuningSelector
            wireNumber={props.wireNumber}
            activeWires={props.activeWires}
            activeWiresChange={props.activeWiresChange}
            tuningChange={props.tuningChange}
            tuning={props.tuning}
            />
            <StringNumberSelector
            stringNumberChange = {props.stringNumberChange}
            />
            <FretNumberSelector
            fretNumberChange = {props.fretNumberChange}
            />
            <GameStartButtons
            currentQuestionChange = {props.currentQuestionChange}
            currentQuestion = {props.currentQuestion}
            winScore = {props.winScore}
            loseScore = {props.loseScore}
            timePass = {props.timePass}
            selectQuestionFret = {props.selectQuestionFret}
            currentGameModeSet = {props.currentGameModeSet}
            />
            <TimeSelector
            timeRemainingChange = {props.timeRemainingChange}
            />
        </>
    )
}

export default Options;