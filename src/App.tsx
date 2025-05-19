import React from 'react';
import GameController from './components/GameController';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>React Tetris</h1>
      <GameController />
    </div>
  );
};

export default App;
