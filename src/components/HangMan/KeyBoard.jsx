const keys = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
const KeyBoard = ({activeLetters, inactiveLetters, addGuessedLetter, disabled}) => {
    let keyboardClass = "keyboard-button";
    return (
        <div className="keyboard-container">
            {keys.map(key => {
                const isActive = activeLetters.includes(key);
                const isInActive = inactiveLetters.includes(key);
                return (
                    <button
                    onClick={() => addGuessedLetter(key)}
                    className={keyboardClass + (isActive ? " active" : "") + (isInActive ? " inactive" : "")}
                    disabled = {isActive || isInActive || disabled}
                    key={key}
                    >
                        {key}
                    </button>
                )
            })}
        </div>
    )
}
export default KeyBoard;