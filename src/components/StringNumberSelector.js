import React from 'react';

const StringNumberSelector = (props) =>{

    const onStringNumberChange = (event) =>{
      props.handleWireNumberChange(event.target.value);
    }
    
    return(
        <>
        <div className="stringNumberSelector">
          <input type="number" min="1" max="6" defaultValue="6" onChange={onStringNumberChange}/>
          <span>String Number</span>
        </div>
        </>
    )
}

export default StringNumberSelector;