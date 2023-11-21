import React from 'react';

const TimeSelector = (props) =>{
    return(
        <>
            <div className="timeSelectorDiv">
                <select className="timeSelector" onChange={props.timeRemainingChange}>
                    <option value ="3">3</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                    <option value="60" defaultValue>60</option>
                    <option value="90">90</option>
                    <option value="120">120</option>
                </select>
                <span>Time</span>
            </div>
        </>
      )
}
export default TimeSelector;

// className TimeSelector extends React.Component{
//     render(){
//       return(
//         <><div className="timeSelectorDiv">
//         <select className="timeSelector" onChange={this.props.timeRemainingChange}>
//           <option value ="3">3</option>
//           <option value="30">30</option>
//           <option value="45">45</option>
//           <option value="60" selected>60</option>
//           <option value="90">90</option>
//           <option value="120">120</option>
//         </select>
//         <span>Time</span>
//         </div>
//         </>
//       )
//     }
//   }