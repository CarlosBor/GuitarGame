import React from 'react';

const FretNumberSelector = (props) =>{

    return(
        <>
            <div className="fretNumberSelector">
                <input type="number" min="1" max="12" defaultValue="12" onChange={props.fretNumberChange}/>
                <span>Fret Number</span>
            </div>
        </>
      )
}

export default FretNumberSelector;