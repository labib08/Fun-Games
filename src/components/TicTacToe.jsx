import { useEffect, useState } from "react";

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

    return (<button onClick = {onClick} className={boxClass}>{value}</button>);
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
    function getWinner(box) {
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
                return box[x];
            }
        }
        return null;
    }

    function handleClick(getCurrBox) {
        let copyBox = [...box];
        if (getWinner(copyBox) || copyBox[getCurrBox]) {
            return;
        }
        copyBox[getCurrBox] = isXTurn ? "X" : "O";
        setIsXTurn(!isXTurn);
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
        if (!getWinner(box) && box.every(item =>item !== '' )) {
            setStatus("Game Drawn!");
            setIsLive(false);

        }
        else if (getWinner(box)){
            setStatus((getWinner(box)) + " Wins!");
            setIsLive(false);
            setWinner(getWinner(box));
        }
        else {
            setStatus((isXTurn ? 'X' : 'O') + "'s Turn");
            setIsLive(true);
        }

    }, [box, isXTurn]);

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
        </div>
    )
};

export default TicTacToe;
