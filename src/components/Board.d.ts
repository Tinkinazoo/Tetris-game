import React from 'react';
interface BoardProps {
    board: number[][];
    piece: {
        shape: number[][];
        x: number;
        y: number;
        color: string;
    };
}
declare const Board: React.FC<BoardProps>;
export default Board;
