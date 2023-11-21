import React from 'react';

const StringNumberSelector = (props) =>{
    return(
        <>
        <div className="stringNumberSelector">
          <input type="number" min="1" max="6" defaultValue="6" onChange={props.stringNumberChange}/>
          <span>String Number</span>
        </div>
        </>
    )
}

export default StringNumberSelector;