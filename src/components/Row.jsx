import React from 'react';
import Cell from './Cell';

const Row = ( props ) => {
    return (  
        <div className="row">
            {props.row.map((cell, cellIndex) => {
                return (
                    <Cell 
                        cell={cell} 
                        key={cellIndex}
                        openCell={props.openCell}
                        putFlag={props.putFlag}
                    />
                );
            })}
        </div>
    );
}
 
export default Row;