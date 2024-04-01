const GuessWord = () => {
    const word = "test";
    const guessedLetters = ["t", "e", "g"];
    return (
        <div className="guessed-word">
            {word.split("").map((letter, index) => (
                <span style={{ borderBottom: "10px solid white" }} key = {index}>
                    <span className= {guessedLetters.includes(letter) ? "letter-visible" : "letter-hidden" } > {letter} </span>
                 </span>
            ))}
        </div>
    )
}
export default GuessWord;