import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import SudokuBoard from "./SudokuBoard";
import { solve, isValidValue, isValidSudoku } from "./utils";
import globals from "./globals";

export default class Sudoku extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(globals.puzzleSize ** 2).fill(""),
      valid: true,
      solved: false,
      solveTime: 0
    };
  }

  render() {
    let message = null;
    if (!this.state.valid) {
      message = (
        <div className="alert alert-danger">Invalid Sudoku puzzle!</div>
      );
    } else if (this.state.solved) {
      message = (
        <div className="alert alert-success">
          Solved in {this.state.solveTime / 1000} seconds!
        </div>
      );
    }

    const solveButton =
      !this.state.solved && this.state.valid ? (
        <Button bsStyle="primary" onClick={this.getSolution.bind(this)}>
          Solve
        </Button>
      ) : (
        <Button bsStyle="primary" disabled>
          Solve
        </Button>
      );

    return (
      <div className="sudoku container">
        {/* GitHub Ribbon */}
        <a href="https://github.com/orn688/sudoku-solver">
          <img
            style={{ position: "absolute", top: 0, right: 0, border: 0 }}
            src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67"
            alt="Fork me on GitHub"
            data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"
          />
        </a>
        <header>
          <h1>Sudoku Solver</h1>
          <h5>
            Built by <a href="https://www.onewman.com">Oliver Newman</a>
          </h5>
        </header>

        <div>
          {message ? message : <div />}
          <SudokuBoard
            squares={this.state.squares.slice()}
            onChange={this.handleChange.bind(this)}
          />
          <ButtonGroup className="sudoku-buttons" vertical block>
            {solveButton}
            <Button bsStyle="danger" onClick={this.reset.bind(this)}>
              Reset
            </Button>
          </ButtonGroup>
        </div>

        <footer>
          &copy; {new Date().getFullYear()}{" "}
          <a href="https://www.onewman.com">Oliver Newman</a>
        </footer>
      </div>
    );
  }

  handleChange(i, event) {
    const squares = this.state.squares.slice();

    if (event.target.value === "" || isValidValue(event.target.value)) {
      squares[i] = event.target.value;

      this.setState({
        squares: squares,
        solveTime: 0,
        solved: false,
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
        solveTime: endTime - startTime,
        solved: true,
        valid: isValidSudoku(solution)
      });
    }
  }

  reset() {
    this.setState({
      squares: Array(globals.puzzleSize ** 2).fill(""),
      valid: true,
      solved: false,
      solveTime: 0
    });
  }
}
