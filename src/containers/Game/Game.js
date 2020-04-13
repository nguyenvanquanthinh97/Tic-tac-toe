import React, { Component } from 'react';

import Board from '../../components/Board';
import './style.scss';

const { calcPosibility, calcWinner } = require('../../utils/calc');

class Game extends Component {
  constructor(props) {
    super(props);
    const { size } = this.props;
    const numSquares = size * size;
    const lineWins = calcPosibility(size);

    this.state = {
      lineWins,
      isFinish: false,
      stepNumber: 0,
      maxSteps: numSquares,
      history: [{
        squares: Array(numSquares).fill(null),
        position: { r: -1, c: -1 }
      }],
      xIsNext: true,
      isAscending: true
    };
  }

  handleClick(i) {
    const { history, isFinish, xIsNext, stepNumber, lineWins } = this.state;
    const { size } = this.props;
    const updatedHistory = history.slice(0, stepNumber + 1);
    const current = updatedHistory[updatedHistory.length - 1];
    const squares = current.squares.slice();

    const r = parseInt((i / size) + 1);
    const c = (i % size) + 1;

    if (isFinish) {
      return;
    }
    const playerTurn = xIsNext ? 'X' : 'O';
    if (squares[i]) {
      return;
    }

    squares[i] = playerTurn;

    if (calcWinner(lineWins, playerTurn, squares)) {
      this.setState({
        isFinish: true,
        history: updatedHistory.concat([
          {
            squares: squares,
            position: {
              r, c
            }
          }
        ]),
        stepNumber: updatedHistory.length
      });
      return;
    }
    this.setState({
      history: updatedHistory.concat([
        {
          squares: squares,
          position: {
            r, c
          }
        }
      ]),
      xIsNext: !xIsNext,
      stepNumber: updatedHistory.length
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  reverseMoves() {
    this.setState({
      isAscending: !this.state.isAscending
    });
  }

  render() {
    const { history, lineWins, xIsNext, stepNumber, maxSteps, isFinish, isAscending } = this.state;
    const { size } = this.props;
    const playerTurn = xIsNext ? "X" : "O";
    const current = history[stepNumber];

    const lineWin = calcWinner(lineWins, playerTurn, current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move # ' + move + ` with row: ${step.position.r}, col: ${step.position.c}` :
        'Go to Game Start';
      const classNames = stepNumber === move ? 'bold' : '';
      return (
        <li key={move}>
          <button className={classNames} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    if (!isAscending) {
      moves.reverse();
    }

    let status = 'Next player: ' + playerTurn;
    if (stepNumber === maxSteps) {
      status = "Draw-No One Win this game";
    }
    if (lineWin) {
      status = "Winner: " + playerTurn;
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            size={size}
            lineWin={lineWin}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            isFinish={isFinish}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <button onClick={() => this.reverseMoves()}>{isAscending ? "Descending" : "Ascending"}</button>
          <ol className="move-list">{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;