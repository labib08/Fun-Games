import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Particles from './particle';
const HomePage = () => {
    const [goToTicTacToe, setGoToTicTacToe] = useState(false);
    const [goHangMan, setGoHangMan] = useState(false);

    if (goToTicTacToe) {
        return <Navigate to = "/tictactoe"/>
    }
    if (goHangMan) {
        return <Navigate to = "/hangman"/>
    }
    return (
        <div className="HomePage-container">
            <Particles id = "particles"></Particles>
            <h1 className="HomePage-header">Welcome to Fun Games!</h1>
            <h2 className="HomePage-header-2">Fortunately or unfortunately there are only two games :(( </h2>
            <button className='HomePage-btn' onClick={() => setGoToTicTacToe(true)}>TicTacToe</button>
            <br/>
            <button className='HomePage-btn' onClick={() => setGoHangMan(true)}>Hangman</button>
        </div>
    );
}

export default HomePage