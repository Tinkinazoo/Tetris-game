import React, { useEffect, useRef } from 'react';
import { Tetris } from '../game/tetris';
import { KEY } from '../game/constants';
import Board from './Board';
import Preview from './Preview';
import GameInfo from './GameInfo';

const GameController: React.FC = () => {
  const gameRef = useRef<Tetris | null>(null);
  const [gameState, setGameState] = React.useState({
    board: [] as number[][],
    piece: { shape: [] as number[][], x: 0, y: 0, color: '' },
    nextPiece: 0,
    score: 0,
    level: 0,
    lines: 0,
    isGameOver: false,
    isPaused: false
  });
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  useEffect(() => {
    gameRef.current = new Tetris();
    updateGameState();
    startGameLoop();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameRef.current) return;

      if (e.key === KEY.P) {
        gameRef.current.togglePause();
        updateGameState();
      }

      if (gameRef.current.isPaused || gameRef.current.isGameOver) return;

      switch (e.key) {
        case KEY.LEFT:
          gameRef.current.movePiece('left');
          break;
        case KEY.RIGHT:
          gameRef.current.movePiece('right');
          break;
        case KEY.DOWN:
          if (gameRef.current.movePiece('down')) {
            gameRef.current.score += 1;
          }
          break;
        case KEY.UP:
          gameRef.current.rotatePiece();
          break;
        case KEY.SPACE:
          gameRef.current.hardDrop();
          break;
        default:
          return;
      }
      updateGameState();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(requestRef.current!);
    };
  }, []);

  const updateGameState = () => {
    if (!gameRef.current) return;
    
    const { 
      board, 
      piece, 
      nextPiece, 
      score, 
      level, 
      lines, 
      isGameOver, 
      isPaused 
    } = gameRef.current;
    
    setGameState({
      board: [...board.map(row => [...row])],
      piece: { ...piece, shape: [...piece.shape.map(row => [...row])] },
      nextPiece,
      score,
      level,
      lines,
      isGameOver,
      isPaused
    });
  };

  const startGameLoop = () => {
    const gameLoop = (time: number) => {
      if (!gameRef.current) return;

      if (previousTimeRef.current === undefined) {
        previousTimeRef.current = time;
      }

      const deltaTime = time - previousTimeRef.current;

      if (!gameRef.current.isPaused && !gameRef.current.isGameOver) {
        if (deltaTime > gameRef.current.dropTime) {
          if (!gameRef.current.movePiece('down')) {
            gameRef.current.lockPiece();
          }
          previousTimeRef.current = time;
          updateGameState();
        }
      }

      requestRef.current = requestAnimationFrame(gameLoop);
    };

    requestRef.current = requestAnimationFrame(gameLoop);
  };

  const handleReset = () => {
    if (!gameRef.current) return;
    gameRef.current.resetGame();
    updateGameState();
  };

  const handlePause = () => {
    if (!gameRef.current) return;
    gameRef.current.togglePause();
    updateGameState();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <div>
        <Board board={gameState.board} piece={gameState.piece} />
      </div>
      <div style={{ marginLeft: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h3>Next Piece:</h3>
          <Preview nextPiece={gameState.nextPiece} />
        </div>
        <GameInfo
          score={gameState.score}
          level={gameState.level}
          lines={gameState.lines}
          isGameOver={gameState.isGameOver}
          isPaused={gameState.isPaused}
          onReset={handleReset}
          onPause={handlePause}
        />
      </div>
    </div>
  );
};

export default GameController;
