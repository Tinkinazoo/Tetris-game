import { COLS, ROWS } from './constants';

export const createEmptyBoard = (): number[][] => {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
};

export const randomShape = (): number => {
  return Math.floor(Math.random() * 6);
};

export const rotateMatrix = (matrix: number[][]): number[][] => {
  const N = matrix.length;
  const rotated = Array.from({ length: N }, () => Array(N).fill(0));
  
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      rotated[x][N - 1 - y] = matrix[y][x];
    }
  }
  
  return rotated;
};

export const checkCollision = (
  board: number[][],
  piece: { shape: number[][]; x: number; y: number }
): boolean => {
  const { shape, x, y } = piece;
  
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] !== 0) {
        const newX = x + col;
        const newY = y + row;
        
        if (
          newX < 0 ||
          newX >= COLS ||
          newY >= ROWS ||
          (newY >= 0 && board[newY][newX] !== 0)
        ) {
          return true;
        }
      }
    }
  }
  return false;
};
