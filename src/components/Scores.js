import React from 'react';

const Scores = (props) =>{

    const getScores = (arrayinfo) =>{
        if (typeof arrayinfo !== 'undefined' && arrayinfo != null){
            return(
                <>
                    {renderScore(arrayinfo[0])}
                    {renderScore(arrayinfo[1])}
                    {renderScore(arrayinfo[2])}
                </>) 
        }else{
            return <div>No score</div>
        }
    }

    const renderScore = (scoreArray) =>{
        if (typeof scoreArray!=='undefined'){
            return <div>{scoreArray[0]} points with {scoreArray[1]} frets in {scoreArray[2]} seconds</div>
        }else{
            return <div>Empty</div>
        }
    }

    //   componentDidMount(){
    //     this.props.updateScoreLocalstorage()
    //   }

        return(
          <>
            <div className="ranking">
              <div className="noteScoreBoard"><span className="scoreHeader">noteScoreBoard</span>{getScores(props.scoreboard[0])}</div>
              <div className="questionFretScoreBoard"><span className="scoreHeader">questionFretScoreBoard</span>{getScores(props.scoreboard[1])}</div>
            </div>
          </>
        )
}

export default Scores;