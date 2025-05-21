export const COLS = 10;
export const ROWS = 20;
export const BLOCK_SIZE = 15; // px
export const NEXT_COLS = 4;
export const NEXT_ROWS = 4;

export const SHAPES = [
 /* [],*/
  [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], // I
  [[2, 0, 0], [2, 2, 2], [0, 0, 0]], // J
  [[0, 0, 3], [3, 3, 3], [0, 0, 0]], // L
  [[4, 4], [4, 4]], // O
  [[0, 5, 5], [5, 5, 0], [0, 0, 0]], // S
  [[0, 6, 0], [6, 6, 6], [0, 0, 0]], // T
  [[7, 7, 0], [0, 7, 7], [0, 0, 0]]  // Z
];

export const COLORS = [
  'transparent',
  '#00FFFF', // I - cyan
  '#0000FF', // J - blue
  '#FF7F00', // L - orange
  '#FFFF00', // O - yellow
  '#00FF00', // S - green
  '#800080', // T - purple
  '#FF0000'  // Z - red
];

export const KEY = {
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  DOWN: 'ArrowDown',
  UP: 'ArrowUp',
  SPACE: ' ',
  P: 'p'
};

export const POINTS = {
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800,
  SOFT_DROP: 1,
  HARD_DROP: 2
};

export const LEVEL = {
  0: 800,
  1: 720,
  2: 630,
  3: 550,
  4: 470,
  5: 380,
  6: 300,
  7: 220,
  8: 130,
  9: 100,
  10: 80,
  11: 80,
  12: 80,
  13: 70,
  14: 70,
  15: 70,
  16: 50,
  17: 50,
  18: 50,
  19: 30,
  20: 30
};
