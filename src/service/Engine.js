

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

  insert(tetramino, rotation=null, insertRow=null, insertColumn=null) {
    rotation = rotation ? rotation: tetramino.selectRotation();
    insertRow = (insertRow !== null) ? insertRow : this.insertRow;
    insertColumn = (insertColumn !== null) ? insertColumn : this.insertColumn;

    let insertPositions = [];
    for (let row = 0; row < rotation.length; row++) {
      for (let column = 0; column < rotation[row].length; column++) {
        if (rotation[row][column] !== 0) {
          let nextPosition = this.rows[insertRow + row][insertColumn + column];
          if (nextPosition !== 0) {
            throw "unavailable_insert";
          }
          insertPositions.push([insertRow + row, insertColumn + column]);
        }
      }
    }

    insertPositions.forEach(position => {
      let row = position[0];
      let column = position[1];
      this.rows[row][column] = tetramino;
      tetramino.insertPosition([row, column]);
    });

    return this.rows;
  }

  rotate(tetramino) {
    let currentPositions = tetramino.getPositions();
    let nextRotation = tetramino.nextRotation();

    let startPosition = currentPositions[0];
    this.clearCurrentPosition(tetramino);
    return this.insert(tetramino, nextRotation, startPosition[0], startPosition[1]);
  }

  moveLeft(tetramino) {
    if (tetramino === null) {
      return this.rows;
    }
    let currentPositions = tetramino.getPositions();

    for (let i = 0; i < currentPositions.length; i++) {
      let position = currentPositions[i];
      let row = position[0];
      let column = position[1];
      let leftBlock = this.rows[row][column - 1];

      if (leftBlock === undefined) {
        throw "unavailable_move";
      }

      if (leftBlock !== 0 && leftBlock !== tetramino) {
        // TODO: improve this control!!!
        throw "unavailable_move";
      }
    }

    this.moveToNewPosition(tetramino, 'left')
    return this.rows;
  }

  moveRight(tetramino) {
    if (tetramino === null) {
      return this.rows;
    }
    let currentPositions = tetramino.getPositions();

    for (let i = 0; i < currentPositions.length; i++) {
      let position = currentPositions[i];
      let row = position[0];
      let column = position[1];
      let rightBlock = this.rows[row][column + 1];

      if (rightBlock === undefined) {
        throw "unavailable_move";
      }

      if (rightBlock !== 0 && rightBlock !== tetramino) {
        // TODO: improve this control!!!
        throw "unavailable_move";
      }
    }

    this.moveToNewPosition(tetramino, 'right');
    return this.rows;
  }

  moveDown(tetramino) {
    if (tetramino === null) {
      return this.rows;
    }

    let currentPositions = tetramino.getPositions();

    for (let i = 0; i < currentPositions.length; i++) {
      let position = currentPositions[i];
      let row = position[0];
      let column = position[1];
      let nextBlockRow = this.rows[row + 1];

      if (nextBlockRow === undefined) {
        throw "unavailable_move";
      }

      let nextBlock = nextBlockRow[column];
      if (nextBlock !== 0 && nextBlock !== tetramino) {
        // TODO: improve this control!!!
        throw "unavailable_move";
      }
    }

    this.moveToNewPosition(tetramino, 'down');
    return this.rows;
  }

  clearCurrentPosition(tetramino) {
    let currentPositions = tetramino.getPositions();
    currentPositions.forEach((position) => {
      let row = position[0];
      let column = position[1];
      if (this.rows[row + 1] !== undefined) {
        this.rows[row][column] = 0;
      }
    });

    tetramino.clearPositions();
  }

  // moveToNewPosition(tetramino, direction) {
  //   let currentPositions = tetramino.getPositions();
  //   this.clearCurrentPosition(tetramino);
  //
  //   let currentRotation = tetramino.getRotation();
  //   let startPosition = currentPositions[0];
  //   let row = startPosition[0];
  //   let column = startPosition[1];
  //
  //   if (direction === 'down') {
  //     this.insert(tetramino, currentRotation, row + 1, column);
  //   }
  //
  //   if (direction === 'left') {
  //     this.insert(tetramino, currentRotation, row, column - 1);
  //   }
  //
  //   if (direction === 'right') {
  //     this.insert(tetramino, currentRotation, row, column + 1);
  //   }
  // }

  moveToNewPosition(tetramino, direction) {
    let currentPositions = tetramino.getPositions();
    //let currentRotation = tetramino.getRotation();
    this.clearCurrentPosition(tetramino);

    currentPositions.forEach((position) => {
      let row = position[0];
      let column = position[1];
      if (direction === 'down') {
        if (this.rows[row + 1] !== undefined) {
          this.rows[row + 1][column] = tetramino;
          tetramino.insertPosition([row + 1, column]);
        }
      } else if (direction === 'left') {
        if (this.rows[row][column - 1] !== undefined) {
          this.rows[row][column - 1] = tetramino;
          tetramino.insertPosition([row, column - 1]);
        }
      } else if (direction === 'right') {
        if (this.rows[row][column + 1] !== undefined) {
          this.rows[row][column + 1] = tetramino;
          tetramino.insertPosition([row, column + 1]);
        }
      }
    });
  }
}

export default engine;
