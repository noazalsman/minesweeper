import React, { useState, useEffect } from "react";
import Row from "./Row";

const Board = ( props ) => {

    const findAdjacentMines = async (cell) => {
        let numAdjacentMines = 0;

        for (let row = -1; row <= 1; row++) {
            for (let column = -1; column <= 1; column++) {
                let currentX = cell.x + row;
                let currentY = cell.y + column;

                if (currentX >= 0 && currentX < props.rows && currentY >= 0 && currentY < props.columns) {
                    let currentCell = props.board[currentX][currentY];

                    if (currentCell.hasMine && !(row === 0 && column === 0)) {
                        numAdjacentMines++;
                    }
                }
            }
        }

        return numAdjacentMines;
    }

    const openAroundCells = async (cell) => {
        for (let row = -1; row <= 1; row++) {
            for (let column = -1; column <= 1; column++) {
                let currentX = cell.x + row;
                let currentY = cell.y + column;

                if (currentX >= 0 && currentX < props.rows && currentY >= 0 && currentY < props.columns) {
                    let currentCell = props.board[currentX][currentY];

                    if (!currentCell.hasMine && !currentCell.isOpen) {
                        await openCell(currentCell);
                    }
                }
            }
        }
    }

    const findNewMine = (cell) => {
        let randomRow = Math.floor(Math.random() * props.rows);
        let randomColumn = Math.floor(Math.random() * props.columns);

        let newCell = props.board[randomRow][randomColumn];

        if (newCell.hasMine || newCell === cell) {
            findNewMine(cell);
        } else {
            newCell.hasMine = true;
        }
    }

    const openCell = async (cell) => {
        if (props.gameStatus === "ended") {
            return;
        }

        let numAdjacentMines = await findAdjacentMines(cell);
        
        // if in first turn we get a mine, we need to restart the board
        if (cell.hasMine && props.numOpenCells === 0) {
            console.log("first turn mine");
            cell.hasMine = false;
            findNewMine(cell);
        }

        // if the cell is not open and does not have a flag, open it
        if (!cell.hasFlag && !cell.isOpen) {
            cell.isOpen = true;
            props.handleCellClick();
            
            // if the cell has a mine, game over
            if (cell.hasMine) {
                props.handleGameOver();
            }

            else {
                cell.count = numAdjacentMines;

                // if the cell has no adjacent mines, open around cells
                if (!cell.hasMine && numAdjacentMines === 0) {
                    openAroundCells(cell);
                }
            }
            
        }
            
    }

    const putFlag = (cell) => {
        // if the cell has a flag, remove it
        if (cell.hasFlag) {
            cell.hasFlag = false;
            props.setFlags(props.flags + 1)
        } 
        
        // add a flag if there are flags left
        else {
            if (props.flags > 0) {
                cell.hasFlag = true;
                props.setFlags(props.flags - 1)
            }
        }
    }

    return (
        <div className="board">
            {props.board.map((row, rowIndex) => {
                return ( 
                    <Row 
                        row={row} 
                        key={rowIndex}
                        openCell={openCell}
                        putFlag={putFlag}
                    />
                );
            })}
        </div>
    );
}

export default Board;