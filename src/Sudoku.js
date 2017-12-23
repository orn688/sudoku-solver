import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import SudokuBoard from "./SudokuBoard";
import { solve, isValidValue, isValidSudoku } from "./utils";
import globals from "./globals";

export default class Sudoku extends React.Component {
  constructor(props) {
    super(props);

    let squares;
    if (props.squares) {
      squares = this.props.squares.map(
        value => (isValidValue(value) ? value : "")
      );
    } else {
      squares = Array(globals.puzzleSize ** 2).fill("");
    }

    this.state = {
      squares: squares,
      valid: true
    };
  }

  render() {
    const message = this.state.valid ? <div /> : <p>Invalid Sudoku puzzle</p>;

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
        <Row>
          <Col xs={12}>{message}</Col>
        </Row>
        <Row className="sudoku-board">
          <Col xs={12}>
            <SudokuBoard
              squares={this.state.squares.slice()}
              onChange={this.handleChange.bind(this)}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>{solveButton}</Col>
        </Row>
      </div>
    );
  }

  handleChange(i, event) {
    console.log(this);
    const squares = this.state.squares.slice();

    if (event.target.value === "" || isValidValue(event.target.value)) {
      squares[i] = event.target.value;

      this.setState({
        squares: squares,
        valid: isValidSudoku(squares)
      });
      console.log(this.state.squares);
    }
  }

  getSolution() {
    const solution = solve(this.state.squares);
    if (solution) {
      this.setState({
        squares: solution
      });
    }
  }
}
