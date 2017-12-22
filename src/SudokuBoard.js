import React from "react";
import Square from "./Square";
import "./index.css";
import { isValidValue, isValidSudoku } from "./utils";

export default class SudokuBoard extends React.Component {
  constructor(props) {
    super(props);
    this.size = 9;
    this.state = {
      squares: Array(this.size ** 2).fill("")
    };
  }

  solve() {
    const squares = this.state.squares.map(
      value => (isValidValue(value) ? parseInt(value, 10) : 0)
    );
    const givens = squares.map(value => value > 0);

    let i = 0;
    while (i >= 0 && i < this.size ** 2) {
      // TODO: might be able to optimize this by not copying state every time.
      if (givens[i]) {
        i++;
      } else if (squares[i] === 9) {
        squares[i] = 0;
        i--;
        while (givens[i]) {
          i--;
        }
      } else {
        squares[i]++;
        if (isValidSudoku(squares, this.size)) {
          i++;
        }
      }

      this.setState({
        squares: squares.map(value => (isValidValue(value) ? value : ""))
      });
    }

    if (i < 0) {
      return false;
    } else {
      return true;
    }
  }

  handleChange(i, event) {
    const squares = this.state.squares.slice();

    if (event.target.value === "" || isValidValue(event.target.value)) {
      squares[i] = event.target.value;
    }

    this.setState({
      squares: squares
    });
  }

  renderRow(y) {
    const squares = [];
    const startIndex = this.size * y;

    for (let x = 0; x < this.size; x++) {
      squares.push(this.renderSquare(startIndex + x));
    }

    return (
      <div className="sudoku-row" key={y}>
        {squares}
      </div>
    );
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onChange={event => this.handleChange(i, event)}
        key={i}
      />
    );
  }

  render() {
    const rows = [];
    for (let y = 0; y < this.size; y++) {
      rows.push(this.renderRow(y));
    }

    return (
      <div>
        {rows}
        <button onClick={() => this.solve()}>Solve</button>
      </div>
    );
  }
}
