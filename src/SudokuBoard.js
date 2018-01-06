import React from "react";
import Square from "./Square";
import globals from "./globals";

export default class SudokuBoard extends React.Component {
  render() {
    const squares = [];

    for (let row = 0; row < globals.puzzleSize; row++) {
      for (let col = 0; col < globals.puzzleSize; col++) {
        squares.push(this.renderSquare(row, col));
      }
    }

    return (
      <div class="sudoku-board-container">
        {squares}
      </div>
    );
  }

  renderSquare(row, col) {
    let index = globals.puzzleSize * row + col;
    return (
      <Square
        value={this.props.squares[index]}
        row={row}
        col={col}
        onChange={event => this.props.onChange(index, event)}
        key={index}
      />
    );
  }
}
