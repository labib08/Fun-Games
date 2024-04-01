const GuessWord = ({guessedLetters, wordsGuess, reveal}) => {

    return (
        <div className="guessed-word">
            {wordsGuess.split("").map((letter, index) => (
                <span style={{ borderBottom: "10px solid white" }} key = {index}>
                    <span className= {guessedLetters.includes(letter) || reveal ? (reveal && !guessedLetters.includes(letter)  ? "letter-visible-red" : "letter-visible") :"letter-hidden" } > {letter} </span>
                 </span>
            ))}
        </div>
    )
}
export default GuessWord;