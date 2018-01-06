import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import SudokuBoard from "./SudokuBoard";
import { solve, isValidValue, isValidSudoku } from "./utils";
import globals from "./globals";

export default class Sudoku extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(globals.puzzleSize ** 2).fill(""),
      valid: true,
      solveTime: 0
    };
  }

  render() {
    let message = null;
    if (!this.state.valid) {
      message = (
        <div className="alert alert-danger">Invalid Sudoku puzzle!</div>
      );
    } else if (this.state.solveTime) {
      message = (
        <div className="alert alert-success">
          Solved in {this.state.solveTime / 1000} seconds!
        </div>
      );
    }

    const solveButton = this.state.valid ? (
      <Button bsStyle="primary" onClick={this.getSolution.bind(this)}>
        Solve
      </Button>
    ) : (
      <Button bsStyle="primary" onClick={this.getSolution.bind(this)} disabled>
        Solve
      </Button>
    );

    return (
      <div className="sudoku container">
        {message ? message : <div />}
        <SudokuBoard
          squares={this.state.squares.slice()}
          onChange={this.handleChange.bind(this)}
        />
        {solveButton}
        <Button bsStyle="danger" onClick={this.reset.bind(this)}>
          Reset
        </Button>
      </div>
    );
  }

  handleChange(i, event) {
    const squares = this.state.squares.slice();

    if (event.target.value === "" || isValidValue(event.target.value)) {
      squares[i] = event.target.value;

      this.setState({
        squares: squares,
        valid: isValidSudoku(squares)
      });
    }
  }

  getSolution() {
    const startTime = new Date().getTime();
    const solution = solve(this.state.squares);
    const endTime = new Date().getTime();

    if (solution) {
      this.setState({
        squares: solution,
        solveTime: endTime - startTime
      });
    }
  }

  reset() {
    this.setState({
      squares: Array(globals.puzzleSize ** 2).fill(""),
      valid: true,
      solveTime: 0
    });
  }
}
