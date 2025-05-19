import React from 'react';
import { BLOCK_SIZE } from '../game/constants';

interface CellProps {
  color: string;
}

const Cell: React.FC<CellProps> = ({ color }) => {
  return (
    <div 
      style={{
        width: BLOCK_SIZE,
        height: BLOCK_SIZE,
        backgroundColor: color,
        border: '1px solid rgba(0, 0, 0, 0.1)'
      }}
    />
  );
};

export default Cell;
