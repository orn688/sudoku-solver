import React from "react";

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
