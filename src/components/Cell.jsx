import React from 'react';

const Cell = ( props ) => {
    const renderCell = () => {
        
        // if the cell is open
        if (props.cell.isOpen) {

            // if the cell has a mine
            if (props.cell.hasMine) {
                return (
                    <div className="cell open" onClick={() => props.openCell(props.cell)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-frown-fill" viewBox="0 0 16 16">
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm-2.715 5.933a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"/>
                        </svg>
                    </div>
                )
            }
            
            // if the cell is empty
            else if (props.cell.count === 0) {
                return (
                    <div className="cell open" onClick={() => props.openCell(props.cell)}></div>
                )
            }

            // if the cell has a count > 0
            else {
                return (
                    <div className="cell open" onClick={() => props.openCell(props.cell)}>
                        {props.cell.count}
                    </div>
                )
            }

        } 
        
        // if the cell is closed
        else {
            
            
            if (props.cell.hasFlag) {
                return (
                    <div className="cell" onClick={() => props.openCell(props.cell)} onContextMenu={(e) => {
                        props.putFlag(props.cell)
                        e.preventDefault()
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag-fill" viewBox="0 0 16 16">
                            <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001"/>
                        </svg>
                    </div>
                )
            } 
            
            else {
                return (
                    <div className="cell" onClick={() => props.openCell(props.cell)} onContextMenu={(e) => {
                        props.putFlag(props.cell)
                        e.preventDefault()
                    }}></div>
                )
            }
        }
    }

    return (  
        <>
            {renderCell()}
        </>
    );
}
 
export default Cell;