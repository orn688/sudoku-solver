import globals from "./globals";

export function solve(rawSquares) {
  const squares = rawSquares.map(
    value => (isValidValue(value) ? parseInt(value, 10) : 0)
  );
  const givens = squares.map(value => value > 0);

  let i = 0;
  while (i >= 0 && i < rawSquares.length) {
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
      if (isValidSudoku(squares)) {
        i++;
      }
    }
  }

  if (i < 0) {
    return null;
  } else {
    return squares;
  }
}

export function isValidValue(value) {
  let stringValue;

  try {
    stringValue = value.toString();
  } catch (Error) {
    return false;
  }

  let validValueRegex = /^[1-9]$/;
  return validValueRegex.test(stringValue);
}

export function isValidSudoku(squares) {
  for (let row = 0; row < globals.puzzleSize; row++) {
    if (!rowIsValid(squares, row)) {
      return false;
    }
  }

  for (let col = 0; col < globals.puzzleSize; col++) {
    if (!columnIsValid(squares, col)) {
      return false;
    }
  }

  // Check each 3x3 region.
  for (let col = 0; col < globals.puzzleSize; col += globals.regionSize) {
    for (let row = 0; row < globals.puzzleSize; row += globals.regionSize) {
      if (!regionIsValid(squares, row, col)) {
        return false;
      }
    }
  }

  return true;
}

function rowIsValid(squares, row) {
  let seen = new Set();

  for (let col = 0; col < globals.puzzleSize; col++) {
    let value = squares[row * globals.puzzleSize + col];

    if (isValidValue(value)) {
      if (seen.has(value)) {
        return false;
      }

      seen.add(value);
    }
  }

  return true;
}

function columnIsValid(squares, col) {
  let seen = new Set();

  for (let row = 0; row < globals.puzzleSize; row++) {
    let value = squares[row * globals.puzzleSize + col];

    if (isValidValue(value)) {
      if (seen.has(value)) {
        return false;
      }

      seen.add(value);
    }
  }

  return true;
}

function regionIsValid(squares, startRow, startCol) {
  let seen = new Set();

  for (let colOffset = 0; colOffset < globals.regionSize; colOffset++) {
    for (let rowOffset = 0; rowOffset < globals.regionSize; rowOffset++) {
      const row = startRow + rowOffset;
      const col = startCol + colOffset;
      const value = squares[row * globals.puzzleSize + col];

      if (isValidValue(value)) {
        if (seen.has(value)) {
          return false;
        }

        seen.add(value);
      }
    }
  }

  return true;
}
