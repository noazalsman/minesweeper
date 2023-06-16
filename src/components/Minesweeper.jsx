import React ,{ useState, useEffect } from "react";
import Board from "./Board";
import Boardhead from "./Boardhead";

const Minesweeper = () => {
    const rows = 10;
    const columns = 10;
    const mines = 10;
    const [board, setBoard] = useState([]);
    const [flags, setFlags] = useState(10);
    const [time, setTime] = useState(0);
    const [gameStatus, setGameStatus] = useState("waiting"); // waiting, running, ended
    const [numOpenCells, setNumOpenCells] = useState(0);
    const [status, setStatus] = useState("play"); // play, win, lose

    useEffect(() => {
        const newBoard = createBoard();
        setBoard(newBoard);
    }, []);

    useEffect(() => {
        if (numOpenCells === rows * columns - mines) {
            setGameStatus("ended");
            setStatus("win");
        }
    }, [numOpenCells]);

    const createBoard = () => {
        let board = [];

        for (let i = 0; i < rows; i++) {
            board.push([]);

            for (let j = 0; j < columns; j++) {
                board[i].push({
                    x: i,
                    y: j,
                    count: 0,
                    isOpen: false,
                    hasMine: false,
                    hasFlag: false
                });
            }
        }

        // after we create our board we need to add mines
        for (let i = 0; i < mines; i++) {
            let randomRow = Math.floor(Math.random() * rows);
            let randomColumn = Math.floor(Math.random() * columns);

            let cell = board[randomRow][randomColumn];

            if (cell.hasMine) {
                i--;
            } else {
                cell.hasMine = true;
            }
        }

        return board;
    }


    useEffect(() => {
        let timer = null;
        
        if (gameStatus === 'running' && numOpenCells > 0) {
            timer = setInterval(() => {
                setTime(time => time + 1);
            }, 1000);
        }
        
        return () => {
            if (timer !== null) {
                clearInterval(timer);
            }
        };
    }, [gameStatus, numOpenCells]);

    const handleCellClick = () => {
        if (numOpenCells === 0 && gameStatus === "waiting") {
            setGameStatus("running");
        }

        setNumOpenCells(numOpenCells => numOpenCells + 1);
    }

    const handleResetClick = () => {
        setTime(0);
        setGameStatus("waiting");
        setStatus("play");
        setNumOpenCells(0);
        setFlags(10);
        setBoard(createBoard());
    }

    const handleGameOver = () => {
        setGameStatus("ended");
        setStatus("lose");
    }

    return (
        <div className="minesweeper">
            <Boardhead 
                time={time}
                flags={flags}
                handleResetClick={handleResetClick}
                status={status}
            />
            <Board 
                board={board}
                rows={rows} 
                columns={columns}
                flags={flags}
                setFlags={setFlags}
                mines={mines}
                numOpenCells={numOpenCells}
                gameStatus={gameStatus}
                setNumOpenCells={setNumOpenCells}
                handleCellClick={handleCellClick}
                handleGameOver={handleGameOver}
            />
        </div>
    );
}

export default Minesweeper;