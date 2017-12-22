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

export function isValidSudoku(squares, size) {
  // Check each row.
  for (let y = 0; y < size; y++) {
    let seen = new Set();

    for (let x = 0; x < size; x++) {
      let value = squares[y * size + x];

      if (isValidValue(value)) {
        if (seen.has(value)) {
          return false;
        }

        seen.add(value);
      }
    }
  }

  // Check each column.
  for (let x = 0; x < size; x++) {
    let seen = new Set();

    for (let y = 0; y < size; y++) {
      let value = squares[y * size + x];

      if (isValidValue(value)) {
        if (seen.has(value)) {
          return false;
        }

        seen.add(value);
      }
    }
  }

  // Check each 3x3 square.
  for (let x = 0; x < size; x += Math.sqrt(size)) {
    for (let y = 0; y < size; y += Math.sqrt(size)) {
      let seen = new Set();

      for (let xo = 0; xo < Math.sqrt(size); xo++) {
        for (let yo = 0; yo < Math.sqrt(size); yo++) {
          let value = squares[(y + yo) * size + x + xo];

          if (isValidValue(value)) {
            if (seen.has(value)) {
              return false;
            }

            seen.add(value);
          }
        }
      }
    }
  }

  return true;
}
