

let engine = class Engine {
  insertRow = 0
  insertColumn = 10;
  rows = []

  initBoard(width, height) {
    const rows = new Array(height);
    for (let row = 0; row < rows.length; row++) {
     rows[row] = [...new Array(width)].map(() => {return 0;});
    }
    this.rows = rows;

    return this.rows;
  }

  clearSuccessRows() {
    let width = this.rows[0].length;
    for (let row = 0; row < this.rows.length; row++) {
      if (this.rows[row].every(column => column !== 0)) {
        this.rows.splice(row, 1);
        this.rows.unshift([...new Array(width)].map(() => {return 0;}))
      }
    }

    return this.rows;
  }

  getInsertPositions(tetramino, rotation, insertRow = null, insertColumn = null) {
    rotation = rotation ? rotation: tetramino.selectRotation();
    insertRow = (insertRow !== null) ? insertRow : this.insertRow;
    insertColumn = (insertColumn !== null) ? insertColumn : this.insertColumn;

    let insertAvailable = true;
    let insertPositions = [];
    for (let row = 0; row < rotation.length; row++) {
      for (let column = 0; column < rotation[row].length; column++) {
        let positionObject = {};
        positionObject[rotation[row][column]] = [insertRow + row, insertColumn + column];
        insertPositions.push(positionObject);

        if (rotation[row][column] === 0) {
          continue;
        }

        let nextRow = this.rows[insertRow + row];
        if (nextRow === undefined) {
          insertAvailable = false;
          continue;
        }

        let nextPosition = this.rows[insertRow + row][insertColumn + column];
        if (nextPosition === undefined) {
          insertAvailable = false;
          continue;
        }

        if (nextPosition !== 0 && nextPosition !== tetramino) {
          insertAvailable = false;
          continue;
        }
      }
    }

    if (insertAvailable) {
      return insertPositions;
    } else {
      return [];
    }
  }

  insert(tetramino, insertPositions) {
    if (insertPositions.length === 0) {
      throw "unavailable_insert"
    }

    this.clearCurrentPosition(tetramino);
    insertPositions.forEach(position => {
      Object.keys(position).forEach(key => {
        let row = position[key][0];
        let column = position[key][1];
        if (key === '1') {
          this.rows[row][column] = tetramino;
        }
        tetramino.insertPosition(position);
      });
    });

    return this.rows;
  }

  rotate(tetramino) {
    let currentPositions = tetramino.getPositions();
    let nextRotation = tetramino.nextRotation();

    let startPosition = Object.values(currentPositions[0])[0];
    let insertPositions = this.getInsertPositions(tetramino, nextRotation, startPosition[0], startPosition[1]);
    if (insertPositions.length === 0) {
      throw "unavailable_move"
    }

    this.insert(tetramino, insertPositions);
    return this.rows
  }

  moveLeft(tetramino) {
    if (tetramino === null) {
      return this.rows;
    }

    this.moveToNewPosition(tetramino, 'left')
    return this.rows;
  }

  moveRight(tetramino) {
    if (tetramino === null) {
      return this.rows;
    }

    this.moveToNewPosition(tetramino, 'right');
    return this.rows;
  }

  moveDown(tetramino) {
    if (tetramino === null) {
      return this.rows;
    }

    this.moveToNewPosition(tetramino, 'down');
    return this.rows;
  }

  clearCurrentPosition(tetramino) {
    let currentPositions = tetramino.getPositions();
    currentPositions.forEach((position) => {
      let row = Object.values(position)[0][0];
      let column = Object.values(position)[0][1];
      if (this.rows[row][column] === tetramino) {
        this.rows[row][column] = 0;
      }
    });

    tetramino.clearPositions();
  }

  moveToNewPosition(tetramino, direction) {
    let currentPositions = tetramino.getPositions();
    let currentRotation = tetramino.getRotation();

    let insertRow = Object.values(currentPositions[0])[0][0];
    let insertColumn = Object.values(currentPositions[0])[0][1];

    if (direction === 'down') {
      insertRow += 1;
    }

    if (direction === 'left') {
      insertColumn -= 1;
    }

    if (direction === 'right') {
      insertColumn += 1;
    }

    let insertPositions = this.getInsertPositions(tetramino, currentRotation, insertRow, insertColumn);
    if (insertPositions.length === 0) {
      throw "unavailable_move"
    }

    this.insert(tetramino, insertPositions);
  }
}

export default engine;
