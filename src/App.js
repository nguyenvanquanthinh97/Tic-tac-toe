import React from 'react';
import './App.css';

import Game from './containers/Game';

function App() {
  return (
    <div className="App">
      <Game size={5} />
    </div >
  );
}

export default App;
