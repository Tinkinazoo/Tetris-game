import { 
  COLS, 
  ROWS, 
  SHAPES, 
  COLORS, 
  KEY, 
  POINTS, 
  LEVEL 
} from './constants';
import { 
  createEmptyBoard, 
  randomShape, 
  rotateMatrix, 
  checkCollision 
} from './helpers';

export class Tetris {
  board: number[][];
  piece: {
    shape: number[][];
    x: number;
    y: number;
    color: string;
  };
  nextPiece: number;
  score: number;
  level: number;
  lines: number;
  isGameOver: boolean;
  isPaused: boolean;
  dropTime: number;
  dropStart: number;
  requestId: number | null;

  constructor() {
    this.board = createEmptyBoard();
    this.piece = this.createPiece();
    this.nextPiece = randomShape();
    this.score = 0;
    this.level = 0;
    this.lines = 0;
    this.isGameOver = false;
    this.isPaused = false;
    this.dropTime = LEVEL[this.level as keyof typeof LEVEL];
    this.dropStart = 0;
    this.requestId = null;
  }

  createPiece() {
    const shape = SHAPES[this.nextPiece];
    return {
      shape,
      x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2),
      y: -2,
      color: COLORS[this.nextPiece]
    };
  }

  movePiece(direction: 'left' | 'right' | 'down'): boolean {
    const { x, y } = this.piece;
    let newX = x;
    let newY = y;

    switch (direction) {
      case 'left':
        newX = x - 1;
        break;
      case 'right':
        newX = x + 1;
        break;
      case 'down':
        newY = y + 1;
        break;
    }

    if (!checkCollision(this.board, { ...this.piece, x: newX, y: newY })) {
      this.piece.x = newX;
      this.piece.y = newY;
      return true;
    }
    return false;
  }

  rotatePiece() {
    const rotated = rotateMatrix(this.piece.shape);
    const originalShape = this.piece.shape;
    this.piece.shape = rotated;

    if (checkCollision(this.board, this.piece)) {
      this.piece.shape = originalShape;
    }
  }

  hardDrop() {
    while (this.movePiece('down')) {
      this.score += POINTS.HARD_DROP;
    }
    this.lockPiece();
  }

  lockPiece() {
    const { shape, x, y, color } = this.piece;
    
    shape.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell !== 0) {
          const boardY = y + rowIndex;
          const boardX = x + colIndex;
          if (boardY >= 0) {
            this.board[boardY][boardX] = cell;
          }
        }
      });
    });

    this.clearLines();
    this.piece = this.createPiece();
    this.nextPiece = randomShape();

    if (checkCollision(this.board, this.piece)) {
      this.isGameOver = true;
    }
  }

  clearLines() {
    let linesCleared = 0;
    
    for (let y = ROWS - 1; y >= 0; y--) {
      if (this.board[y].every(cell => cell !== 0)) {
        this.board.splice(y, 1);
        this.board.unshift(Array(COLS).fill(0));
        linesCleared++;
        y++; // Check the same row again after shifting
      }
    }

    if (linesCleared > 0) {
      this.updateScore(linesCleared);
    }
  }

  updateScore(linesCleared: number) {
    switch (linesCleared) {
      case 1:
        this.score += POINTS.SINGLE;
        break;
      case 2:
        this.score += POINTS.DOUBLE;
        break;
      case 3:
        this.score += POINTS.TRIPLE;
        break;
      case 4:
        this.score += POINTS.TETRIS;
        break;
    }

    this.lines += linesCleared;
    this.level = Math.floor(this.lines / 10);
    this.dropTime = LEVEL[this.level as keyof typeof LEVEL];
  }

  resetGame() {
    this.board = createEmptyBoard();
    this.piece = this.createPiece();
    this.nextPiece = randomShape();
    this.score = 0;
    this.level = 0;
    this.lines = 0;
    this.isGameOver = false;
    this.isPaused = false;
    this.dropTime = LEVEL[this.level as keyof typeof LEVEL];
  }

  togglePause() {
    this.isPaused = !this.isPaused;
  }
}
