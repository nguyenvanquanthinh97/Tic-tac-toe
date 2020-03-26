import React from 'react';
import './App.css';

import Board from './components/Board';

function App() {
  return (
    <div className="App">
      <Board size={5} />
    </div >
  );
}

export default App;
