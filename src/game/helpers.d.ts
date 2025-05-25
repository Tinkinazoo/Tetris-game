export declare const createEmptyBoard: () => number[][];
export declare const randomShape: () => number;
export declare const rotateMatrix: (matrix: number[][]) => number[][];
export declare const checkCollision: (board: number[][], piece: {
    shape: number[][];
    x: number;
    y: number;
}) => boolean;
