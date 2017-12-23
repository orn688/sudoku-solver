import React from "react";
import Square from "./Square";
import globals from "./globals";

export default class SudokuBoard extends React.Component {
  render() {
    const rows = [];
    for (let row = 0; row < globals.puzzleSize; row++) {
      rows.push(this.renderRow(row));
    }

    return <div>{rows}</div>;
  }

  renderRow(row) {
    const squares = [];
    const startIndex = globals.puzzleSize * row;

    for (let col = 0; col < globals.puzzleSize; col++) {
      squares.push(this.renderSquare(startIndex + col));
    }

    return (
      <div className="sudoku-row" key={row}>
        {squares}
      </div>
    );
  }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onChange={event => this.props.onChange(i, event)}
        key={i}
      />
    );
  }
}
