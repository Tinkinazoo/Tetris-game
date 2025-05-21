import React from 'react';
import { NEXT_COLS, NEXT_ROWS, BLOCK_SIZE, SHAPES, COLORS } from '../game/constants';
import Cell from './Cell';

interface PreviewProps {
  nextPiece: number;
}

const Preview: React.FC<PreviewProps> = ({ nextPiece }) => {
  const shape = SHAPES[nextPiece];
  const color = COLORS[nextPiece];
  const grid = Array.from({ length: NEXT_ROWS }, () => Array(NEXT_COLS).fill(0));

  // Center the piece in the preview
  const offsetX = Math.floor((NEXT_COLS - shape[0].length) / 2);
  const offsetY = Math.floor((NEXT_ROWS - shape.length) / 2);

  shape.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell) {
        grid[rowIndex + offsetY][colIndex + offsetX] = cell;
      }
    });
  });

  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateRows: `repeat(${NEXT_ROWS}, ${BLOCK_SIZE/2}px)`,
        gridTemplateColumns: `repeat(${NEXT_COLS}, ${BLOCK_SIZE/2}px)`,
        border: '2px solid #333',
        width: 'fit-content',
      }}
    >
      {grid.flatMap((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell 
            key={`${rowIndex}-${colIndex}`} 
            color={cell ? color : COLORS[0]}
          />
        ))
      )}
    </div>
  );
};

export default Preview;
