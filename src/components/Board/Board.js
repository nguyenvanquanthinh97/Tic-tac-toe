import React from 'react';
import './style.scss';

import Square from '../Square';

const { calcPosibility, calcWinner } = require('../../utils/calc');

class Board extends React.Component {
  constructor(props) {
    super(props);
    const { size } = this.props;
    const numSquares = size * size;
    this.state = {
      squares: Array(numSquares).fill(null),
      xIsNext: true,
      lineWins: calcPosibility(size),
      isFinish: false,
      count: 0,
      maxSteps: numSquares
    };
  }

  handleClick(i) {
    if (this.state.isFinish) {
      return;
    }
    const squares = this.state.squares.slice();
    const playerTurn = this.state.xIsNext ? 'X' : 'O';
    if (squares[i]) {
      return;
    }

    squares[i] = playerTurn;
    if (calcWinner(this.state.lineWins, playerTurn, squares)) {
      this.setState({ 
        isFinish: true,
        squares: squares
       });
      return;
    }
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      count: this.state.count + 1
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        handleClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    console.log(this.state.count);
    const playerTurn = this.state.xIsNext ? 'X' : 'O';
    const lineWin = calcWinner(this.state.lineWins, playerTurn, this.state.squares);
    let status = 'Next player: ' + playerTurn;
    if(this.state.count === this.state.maxSteps) {
      status = "Draw-No One Win this game";
    }
    if (lineWin) {
      status = "Winner: " + playerTurn;
    }
    const boardShape = [];
    for (let r = 0; r < this.props.size; r++) {
      let boardRow = [];
      for (let c = 0; c < this.props.size; c++) {
        const idx = (r * this.props.size) + c;
        if(this.state.isFinish && lineWin.includes(idx)) {
          boardRow.push(<Square key={`square-${idx}`} value={this.state.squares[idx]} handleClick={() => this.handleClick(idx)} highLighted/>);
          continue;
        }
        boardRow.push(<Square key={`square-${idx}`} value={this.state.squares[idx]} handleClick={() => this.handleClick(idx)} />);
      }
      boardShape.push(<div key={`board-row--${r}`} className="board-row">{boardRow}</div>);
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-game">
          {boardShape}
        </div>
      </div>
    );
  }
}

export default Board;