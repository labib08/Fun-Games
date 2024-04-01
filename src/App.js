import './App.css';
import HangMan from './components/HangMan/HangMan';
import HomePage from './components/HomePage';
import TicTacToe from './components/TicTacToe';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element = {<HomePage />} />
          <Route path='/home' element = {<HomePage />} />
          <Route path='/tictactoe' element = {<TicTacToe />} />
          <Route path='/hangman' element = {<HangMan />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
