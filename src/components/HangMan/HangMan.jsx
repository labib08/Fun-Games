import { useState } from "react";
import { Navigate } from 'react-router-dom';
import Drawing from "./Drawing";
import GuessWord from "./GuessWord.jsx";
import KeyBoard from "./KeyBoard";
import words from "./data.js";

const HangMan = () => {

    const [wordsGuess, setGuessWords] = useState (() => {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        return randomWord;
    } );

    const [guessedLetters, setGuessedLetters] = useState([""]);

    const incorrectLetters = guessedLetters.filter (
        letter => !wordsGuess.includes(letter)
    )
    const [goHome, setGoHome] = useState(false);
    if (goHome) {
        return <Navigate to = "/home"/>;
    }
    return (
        <div className="hangman-container">
            <h1 className="hangman-header">HangMan</h1>
            <Drawing numberOfGuesses = {incorrectLetters.length}/>
            <br/>
            <GuessWord />
            <br/>
            <div style = {{alignSelf: "stretch"}}>
                <KeyBoard/>
            </div>
            <button onClick={() => setGoHome(true)} className="TicTacToe-reset" >Home</button>
        </div>
    );
}

export default HangMan;