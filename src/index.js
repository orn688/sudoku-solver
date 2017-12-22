import React from "react";
import ReactDOM from "react-dom";
import SudokuBoard from "./SudokuBoard";
import "./index.css";

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
