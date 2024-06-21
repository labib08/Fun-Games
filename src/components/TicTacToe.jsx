import { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
function Box ({value, onClick, isXTurn, isLive}) {
    let boxClass = "TicTacToe-box";
    if (value === "X") {
        boxClass += " X-style";
    }
    else if (value === "O") {
        boxClass += " O-style";
    }
    else {
        if (isLive) {
            boxClass += isXTurn  ? " next-X-turn" : " next-O-turn";
        }
    }

    return (<button onClick = {onClick} className={boxClass} disabled = {isXTurn}>{value}</button>);
}
function Strike ({newClass, winner}) {
    const strikeClass = (winner === "O" ? "strike-o" : "strike-x") + newClass;
    return <div className={strikeClass}></div>;
}

function StatusHeader ({isLive, isXTurn, status, winner}) {
    let headerClassName = "TicTacToe-status"
    if (isLive) {
        if (isXTurn) {
            headerClassName += " X-turn";
        }
        else {
            headerClassName += " O-turn";
        }
    }
    else {
        if (winner === "X") {
            headerClassName += " X-turn";
        }
        else if (winner === "O"){
            headerClassName += " O-turn";
        }
    }
    return (
    <h2 className={headerClassName}>{status}</h2>
    );
};


const TicTacToe = () => {

    const [box, setBox] = useState(Array(9).fill(""));
    const [isXTurn, setIsXTurn] = useState(true);
    const [status, setStatus] = useState('');
    const [isLive, setIsLive] = useState(true);
    const [winType, setWinType] = useState('');
    const [winner, setWinner] = useState('');
    function getWinner(box, isFinal) {
        const winCondition = [
            [0, 1, 2], //column1
            [3, 4, 5], //column2
            [6, 7, 8], //column3
            [2, 5, 8], //row3
            [0, 4, 8], //diagonal1
            [2, 4, 6], //diagonal2
            [0, 3, 6], //row1
            [1, 4, 7],  //row2
        ];
        for (let i =0; i < winCondition.length; i++) {
            const[x,y,z] = winCondition[i];
            if (box[x] && box[x] === box[y] && box[x] === box[z]) {
                if (isFinal) {
                    if (i === 0) {
                        setWinType(' strike-column-1');
                   }
                   else if (i === 1) {
                       setWinType(' strike-column-2');
                   }

                   else if (i === 2) {
                       setWinType(' strike-column-3');
                   }

                   else if (i === 3) {
                       setWinType(' strike-row-3');
                   }

                   else if (i === 4) {
                       setWinType(' strike-diagonal-1');
                   }

                   else if (i === 5) {
                       setWinType(' strike-diagonal-2');
                   }

                   else if (i === 6) {

                       setWinType(' strike-row-1');
                   }

                   else if (i === 7) {
                       setWinType(' strike-row-2');
                   }
                }
                return box[x];
            }
        }
        return null;
    }
    function miniMax(copyBox, depth, isXTurn) {
        var bestScore;
        var score;

        // Check for a winner or if the game is a draw
        const winner = getWinner(copyBox, false);
        if (winner) {
            if (winner === 'X') {
                return 1;
            } else if (winner === 'O') {
                return -1;
            }
        } else if (copyBox.every(item => item !== '')) {
            return 0;
        }

        if (isXTurn) {
            bestScore = -Infinity;
            for (var i = 0; i < copyBox.length; i++) {
                if (copyBox[i] === '') {
                    copyBox[i] = 'X';
                    score = miniMax([...copyBox], depth + 1, false);
                    copyBox[i] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            bestScore = Infinity;
            for (var i = 0; i < copyBox.length; i++) {
                if (copyBox[i] === '') {
                    copyBox[i] = 'O';
                    score = miniMax([...copyBox], depth + 1, true);
                    copyBox[i] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    function aiTurn(box) {
        let copyBox = [...box];
        var bestScore = -Infinity;
        var bestMove = -1;

        for (var i = 0; i < box.length; i++) {
            if (copyBox[i] === '') {
                copyBox[i] = 'X';
                var score = miniMax([...copyBox], 0, false);
                copyBox[i] = '';
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }


            copyBox[bestMove] = 'X';
            setBox(copyBox);
            setIsXTurn(false);

    }

    function handleClick(getCurrBox) {
        let copyBox = [...box];
        if (getWinner(copyBox, false) || copyBox[getCurrBox]) {
            return;
        }

        copyBox[getCurrBox] = isXTurn ? "X" : "O";
        setIsXTurn(true);
        setBox(copyBox);
    }

    function handleReset() {
        setIsXTurn(true);
        setBox(Array(9).fill(''));
        setIsLive(false);
        setWinType('');
        setWinner('');
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (isXTurn && isLive) {
                aiTurn(box);
            }
          }, 500);

          return () => clearTimeout(timeoutId);
      }, [isXTurn, box, status]);
    useEffect(() => {
        if (!getWinner(box, false) && box.every(item =>item !== '' )) {
            setStatus("Game Drawn!");
            setIsLive(false);

        }
        else if (getWinner(box, true)){
            setStatus((getWinner(box, true)) + " Wins!");
            setIsLive(false);
            setWinner(getWinner(box, true));
        }
        else {
            let xTurn = "X's Turn (Ai is thinking...)";
            let oTurn = "O's Turn";
            setStatus((isXTurn ? xTurn : oTurn));
            setIsLive(true);

        }

    }, [box, isXTurn]);

    const [goHome, setGoHome] = useState(false);

    if (goHome) {
        return <Navigate to = "/home"/>
    }
    return (
        <div className="TicTacToe-container">
            <h1 className="TicTacToe-header">Tic Tac Toe</h1>

            <StatusHeader isLive={isLive} isXTurn={isXTurn} status= {status} winner = {winner}/>

            <div className="TicTacToe-board">
                <Strike newClass={winType} winner = {winner}/>
                <div className="TicTacToe-row1">
                    <Box value = {box[0]} onClick={() => handleClick(0)} isXTurn={isXTurn} isLive={isLive}/>
                    <Box value = {box[1]} onClick={() => handleClick(1)} isXTurn={isXTurn} isLive={isLive}/>
                    <Box  value = {box[2]} onClick={() => handleClick(2)} isXTurn={isXTurn} isLive={isLive}/>
                </div>
                <div className="TicTacToe-row2">
                    <Box value = {box[3]}  onClick={() => handleClick(3)} isXTurn={isXTurn} isLive={isLive}/>
                    <Box value = {box[4]}  onClick={() => handleClick(4)} isXTurn={isXTurn} isLive={isLive}/>
                    <Box value = {box[5]}  onClick={() => handleClick(5)} isXTurn={isXTurn} isLive={isLive}/>
                </div>
                <div className="TicTacToe-row3">
                    <Box value = {box[6]}  onClick={() => handleClick(6)} isXTurn={isXTurn} isLive={isLive}/>
                    <Box value = {box[7]}  onClick={() => handleClick(7)} isXTurn={isXTurn} isLive={isLive}/>
                    <Box value = {box[8]}  onClick={() => handleClick(8)} isXTurn={isXTurn} isLive={isLive}/>
                </div>
            </div>
            <button onClick = {handleReset} className="TicTacToe-reset">Reset</button>
            <br/>
            <button onClick={() => setGoHome(true)} className="TicTacToe-reset" >Home</button>
        </div>
    )
};

export default TicTacToe;
