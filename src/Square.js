import React from "react";
import "./index.css";

export default function Square(props) {
  return (
    <input
      type="text"
      value={props.value}
      className="square"
      onChange={props.onChange}
    />
  );
}
