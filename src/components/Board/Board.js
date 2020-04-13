import React from 'react';
import './style.scss';

import Square from '../Square';

const Board = ({ size, lineWin, squares, onClick, isFinish }) => {
  const boardShape = [];
  for (let r = 0; r < size; r++) {
    let boardRow = [];
    for (let c = 0; c < size; c++) {
      const idx = (r * size) + c;
      if (isFinish && lineWin.includes(idx)) {
        boardRow.push(<Square key={`square-${idx}`} value={squares[idx]} handleClick={() => onClick(idx)} highLighted />);
        continue;
      }
      boardRow.push(<Square key={`square-${idx}`} value={squares[idx]} handleClick={() => onClick(idx)} />);
    }
    boardShape.push(<div key={`board-row--${r}`} className="board-row">{boardRow}</div>);
  }

  return (
    <div>
      <div className="board-game">
        {boardShape}
      </div>
    </div>
  );
};

export default Board;