import React, {useState} from 'react';

const TimeSelector = (props) =>{
    const [timeOption, setTimeOption] = useState(60);

    const handleChange = (event) =>{
        const newValue = event.target.value;
        setTimeOption(newValue);
        props.handleTimeOptionChange(newValue);
    }

    return(
        <>
            <div className="timeSelectorDiv">
                <select className="timeSelector" value={timeOption} onChange={handleChange}>
                    <option value ="3">3</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                    <option value="60">60</option>
                    <option value="90">90</option>
                    <option value="120">120</option>
                </select>
                <span>Time</span>
            </div>
        </>
      )
}
export default TimeSelector;