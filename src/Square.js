import React from "react";
import globals from "./globals";

export default function Square(props) {
  const squareBorderStyle = "1px solid #999";

  const style = {
    gridRowStart: props.row + 1,
    gridRowEnd: "span 1",
    gridColumnStart: props.col + 1,
    gridColumnEnd: "span 1",
    border: squareBorderStyle
  };

  const regionBorderStyle = "2px solid black";

  if (props.row % globals.regionSize === 0) {
    style.borderTop = regionBorderStyle;
  }
  if (props.row % globals.regionSize === globals.regionSize - 1) {
    style.borderBottom = regionBorderStyle;
  }
  if (props.col % globals.regionSize === 0) {
    style.borderLeft = regionBorderStyle;
  }
  if (props.col % globals.regionSize === globals.regionSize - 1) {
    style.borderRight = regionBorderStyle;
  }

  return (
    <input
      type="text"
      value={props.value}
      className="square"
      style={style}
      onChange={props.onChange}
    />
  );

  // if (props.isFocus) {
  //   inputBox.focus()
  // }

  // return inputBox;
}
