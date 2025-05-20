import React from 'react';
interface GameInfoProps {
    score: number;
    level: number;
    lines: number;
    isGameOver: boolean;
    isPaused: boolean;
    onReset: () => void;
    onPause: () => void;
}
declare const GameInfo: React.FC<GameInfoProps>;
export default GameInfo;
