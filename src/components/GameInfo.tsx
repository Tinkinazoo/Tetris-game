import React from 'react';
import { useMediaQuery } from 'react-responsive';

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
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div style={{ marginLeft: !isMobile ? '20px' : '10px' }}>
      <h2>Tetris</h2>
      <div>
        <h3>Score: {score}</h3>
        <h3>Level: {level}</h3>
        <h3>Lines: {lines}</h3>
      </div>
      <div style={{ marginTop: !isMobile ? '20px' : '10px' }}>
        <button onClick={onReset}>New Game</button>
        <button onClick={onPause} style={{ marginLeft: !isMobile ? '10px' : '5px' }}>
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>
      <div style={{ marginTop: !isMobile ? '20px' : '10px' }}>
        <div>
          <button onClick={() => {onButtonClick("left")}} style={{ marginLeft: !isMobile ? '10px' : '5px', marginTop: !isMobile ? '5px' : '2px' }}>← Left</button>
          <button onClick={() => {onButtonClick("right")}} style={{ marginLeft: !isMobile ? '10px' : '5px', marginTop: !isMobile ? '5px' : '2px' }}>→ Right</button>
        </div>
        <div>
          <button onClick={() => {onButtonClick("rotate")}} style={{ marginLeft: !isMobile ? '10px' : '5px', marginTop: !isMobile ? '5px' : '2px' }}>↶ Rotate</button>
          <button onClick={() => {onButtonClick("down")}} style={{ marginLeft: !isMobile ? '10px' : '5px', marginTop: !isMobile ? '5px' : '2px' }}>↓ Down</button>
        </div>
      </div>      
      {isGameOver && (
        <div style={{ marginTop: !isMobile ? '20px' : '10px', color: 'red' }}>
          <h2>Game Over!</h2>
        </div>
      )}
      {isPaused && !isGameOver && (
        <div style={{ marginTop: !isMobile ? '20px' : '10px', color: 'orange' }}>
          <h2>Paused</h2>
        </div>
      )}
    </div>
  );
};

export default GameInfo;
