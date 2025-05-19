export declare class Tetris {
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
    constructor();
    createPiece(): {
        shape: number[][];
        x: number;
        y: number;
        color: string;
    };
    movePiece(direction: 'left' | 'right' | 'down'): boolean;
    rotatePiece(): void;
    hardDrop(): void;
    lockPiece(): void;
    clearLines(): void;
    updateScore(linesCleared: number): void;
    resetGame(): void;
    togglePause(): void;
}
