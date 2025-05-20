import React from 'react';

interface GameInfoProps {
  score: number;
  level: number;
  lines: number;
  isGameOver: boolean;
  isPaused: boolean;
  onReset: () => void;
  onPause: () => void;
  onButtonClick: (btn: "left" | "right" | "down" | "rotate") => void;
}

const GameInfo: React.FC<GameInfoProps> = ({
  score,
  level,
  lines,
  isGameOver,
  isPaused,
  onReset,
  onPause,
  onButtonClick,
}) => {
  return (
    <div style={{ marginLeft: '20px' }}>
      <h2>Tetris</h2>
      <div>
        <h3>Score: {score}</h3>
        <h3>Level: {level}</h3>
        <h3>Lines: {lines}</h3>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={onReset}>New Game</button>
        <button onClick={onPause} style={{ marginLeft: '10px' }}>
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <div>
          <button onClick={() => {onButtonClick("left")}} style={{ marginLeft: '10px', marginTop: '5px' }}>← Left</button>
          <button onClick={() => {onButtonClick("right")}} style={{ marginLeft: '10px', marginTop: '5px' }}>→ Right</button>
        </div>
        <div>
          <button onClick={() => {onButtonClick("rotate")}} style={{ marginLeft: '10px', marginTop: '5px' }}>↶ Rotate</button>
          <button onClick={() => {onButtonClick("down")}} style={{ marginLeft: '10px', marginTop: '5px' }}>↓ Down</button>
        </div>
      </div>      
      {isGameOver && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <h2>Game Over!</h2>
        </div>
      )}
      {isPaused && !isGameOver && (
        <div style={{ marginTop: '20px', color: 'orange' }}>
          <h2>Paused</h2>
        </div>
      )}
    </div>
  );
};

export default GameInfo;
