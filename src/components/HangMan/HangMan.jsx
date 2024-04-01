import { useState } from "react";
import { Navigate } from 'react-router-dom';
import words from "./data";

function Draw ({}) {
    return (
        <div className="hangman-drawing">
            <div className="hangman-hanger-1"/>
            <div className = "hangman-hanger-2"/>
            <div className = "hangman-hanger-3"/>
            <div className = "hangman-hanger-4"/>
        </div>
    )
}

const HangMan = () => {
    const [guessWord, setGuessWord] = useState(() => {
        return words[Math.floor(Math.random * words.length)]
    });
    const [goHome, setGoHome] = useState(false);
    //const [guessedLetters, setGuessedLetters] = useState<string[]>([])

    if (goHome) {
        return <Navigate to = "/home"/>
    }


    return (
        <div className="hangman-container">
            <div className= "hangman-navbar">
                <h1 className="hangman-header">HangMan</h1>
                <button onClick={() => setGoHome(true)} className="TicTacToe-reset" >Home</button>
            </div>
            <Draw/>

        </div>
    );
}

export default HangMan;