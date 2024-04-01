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
const KeyBoard = () => {

    return (
        <div className="keyboard-container">
            {keys.map(key => {
                return (
                    <button className="keyboard-button" key = {key}> {key} </button>
                )
            })}
        </div>
    )
}
export default KeyBoard;