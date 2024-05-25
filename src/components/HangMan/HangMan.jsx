import { useCallback, useState } from "react";
import { Navigate } from 'react-router-dom';
import Drawing from "./Drawing";
import GuessWord from "./GuessWord.jsx";
import KeyBoard from "./KeyBoard";
import words from "./data.js";

const HangMan = () => {

    let randomNum = Math.floor(Math.random() * words.length);
    function getWord({randomNum}) {

        return words[randomNum];
    }

    function handleReset() {
        randomNum = Math.floor(Math.random() * words.length);
        setGuessWords(getWord(randomNum = {randomNum}));
        setGuessedLetters([""]);
    }
    const [wordsGuess, setGuessWords] = useState(getWord(randomNum = {randomNum}));

    const [guessedLetters, setGuessedLetters] = useState([""]);

    const incorrectLetters = guessedLetters.filter (
        letter => !wordsGuess.includes(letter)
    );

    const isLose = incorrectLetters.length >= 6;
    const isWin = wordsGuess.split("").every(letter => guessedLetters.includes(letter))

    const addGuessedLetter = useCallback(
        (letter) => {
            if (guessedLetters.includes(letter)) return;
            setGuessedLetters(currentLetters => [...currentLetters, letter] )
        },
        [guessedLetters]
    );

    const [goHome, setGoHome] = useState(false);
    if (goHome) {
        return <Navigate to = "/home"/>;
    };
    return (
        <div className="hangman-container">
            <h1 className="hangman-header">HangMan</h1>

                    <Drawing numberOfGuesses = {incorrectLetters.length}/>
                    <br/>
                    <GuessWord guessedLetters = {guessedLetters} wordsGuess = {wordsGuess} reveal = {isLose}/>
                    <br/>
                    <div style = {{alignSelf: "stretch"}}>
                        <KeyBoard activeLetters = {guessedLetters.filter(letter => wordsGuess.includes(letter))}
                                inactiveLetters = {incorrectLetters}
                                addGuessedLetter = {addGuessedLetter}
                                disabled = {isWin || isLose}
                        />
            </div>
            {isWin &&  <h1 className="hangman-header">Win!</h1>}
            {isLose && <h1 className="hangman-header">:((</h1>}
            {!isWin && !isLose && <h1 className="hangman-header"> </h1> }

            <br/>
            <button onClick = {handleReset} className="TicTacToe-reset">Hint</button>

            <button onClick = {handleReset} className="TicTacToe-reset">Reset</button>

            <button onClick={() => setGoHome(true)} className="TicTacToe-reset" >Home</button>
        </div>
    );
}

export default HangMan;