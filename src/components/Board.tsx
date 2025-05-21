import React from 'react';
import { COLS, ROWS, BLOCK_SIZE, COLORS } from '../game/constants';
import Cell from './Cell';
import { useMediaQuery } from 'react-responsive';

interface BoardProps {
  board: number[][];
  piece: {
    shape: number[][];
    x: number;
    y: number;
    color: string;
  };
}

const Board: React.FC<BoardProps> = ({ board, piece }) => {
  const { shape, x, y, color } = piece;
  const displayBoard = board.map(row => [...row]);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  // Add current piece to the display board
  shape.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell) {
        const boardY = y + rowIndex;
        const boardX = x + colIndex;
        if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
          displayBoard[boardY][boardX] = cell;
        }
      }
    });
  });

  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateRows: `repeat(${ROWS}, ${BLOCK_SIZE}px)`,
        gridTemplateColumns: `repeat(${COLS}, ${BLOCK_SIZE}px)`,
        border: '2px solid #333'
      }}
    >
      {displayBoard.flatMap((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell 
            key={`${rowIndex}-${colIndex}`} 
            color={cell ? COLORS[cell] : COLORS[0]}
          />
        ))
      )}
    </div>
  );
};

export default Board;
