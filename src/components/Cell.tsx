import React from 'react';
import { BLOCK_SIZE } from '../game/constants';
import { useMediaQuery } from 'react-responsive';

interface CellProps {
  color: string;
}

const Cell: React.FC<CellProps> = ({ color }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div 
      style={{
        width: !isMobile ? BLOCK_SIZE : BLOCK_SIZE/2,
        height: !isMobile ? BLOCK_SIZE : BLOCK_SIZE/2,
        backgroundColor: color,
        border: '1px solid rgba(0, 0, 0, 0.1)'
      }}
    />
  );
};

export default Cell;
