import React from 'react';
import TuningDropdowns from './TuningDropdowns';

const TuningSelector = (props) =>{
    return(
        <>
            <TuningDropdowns
            wireNumber={props.wireNumber}
            activeWires={props.activeWires}
            activeWiresChange={props.activeWiresChange}
            tuningChange={props.tuningChange}
            tuning={props.tuning}
            />
        </>
    )
}

export default TuningSelector;