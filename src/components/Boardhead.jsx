import React from 'react';

const Boardhead = ( props ) => {
    const minutes = Math.floor(props.time / 60);
    const seconds = props.time - minutes * 60 || 0;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const time = `${minutes}:${formattedSeconds}`;
    
    return (  
        <div className={props.status === 'lose' ? "boardhead lose" : (props.status === 'win' ? "boardhead win" : "boardhead")}>
            <div className="flags">{props.flags}</div>
            <button className="reset" onClick={props.handleResetClick}>Reset</button>
            <div className="timer">{time}</div>
        </div>
    );
}
 
export default Boardhead;

