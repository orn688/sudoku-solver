import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function isValidValue(squareValue) {
  let intValue = parseInt(squareValue, 10);
  return !isNaN(intValue) && intValue >= 1 && intValue <= 9;
}

class Square extends React.Component {
  render() {
    return (
      <input
        type="text"
        value={this.props.value}
        className="square"
        onChange={event => this.props.onChange(event)}
      />
    );
  }
}

class SudokuBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(81).fill("")
    };
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

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onChange={event => this.handleChange(i, event)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="sudoku-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="sudoku-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="sudoku-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Sudoku extends React.Component {
  render() {
    return (
      <div className="sudoku">
        <div className="sudoku-board">
          <SudokuBoard />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Sudoku />, document.getElementById("root"));
