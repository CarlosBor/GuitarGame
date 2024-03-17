import React from 'react';

const FretNumberSelector = (props) =>{

    const onFretNumberChange = (event) =>{
        props.handleFretNumberChange(event.target.value);
    }

    return(
        <>
            <div className="fretNumberSelector">
                <input type="number" min="1" max="12" defaultValue="12" onChange={onFretNumberChange}/>
                <span>Fret Number</span>
            </div>
        </>
      )
}

export default FretNumberSelector;