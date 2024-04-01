function HangManHead({}) {
    return <div className="hangman-head"/>
}

function HangManBody () {
    return <div className="hangman-body"/>
}

function HangManRightArm() {
    return <div className = "hangman-right-arm"/>
}

function HangManLeftArm() {
    return <div className= "hangman-left-arm"/>
}

function HangManRightLeg() {
    return <div className="hangman-right-leg"/>
}

function HangManLeftLeg() {
    return <div className="hangman-left-leg"/>
}

function Hanger() {
    return (
        <div>
            <div className="hangman-hanger-1"/>
            <div className = "hangman-hanger-2"/>
            <div className = "hangman-hanger-3"/>
            <div className = "hangman-hanger-4"/>
        </div>
    )
}

const BODY_PARTS = [
    <HangManHead key="head" />,
    <HangManBody key="body" />,
    <HangManRightArm key="rightArm" />,
    <HangManLeftArm key="leftArm" />,
    <HangManRightLeg key="rightLeg" />,
    <HangManLeftLeg key="leftLeg" />
];
const Drawing = ({numberOfGuesses}) => {

    return (
        <div className="hangman-drawing">

            {BODY_PARTS.slice(0, numberOfGuesses)}
            <Hanger/>
        </div>
    )
}

export default Drawing;