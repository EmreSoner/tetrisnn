
export default class BaseTetramino {
  positions = []
  shape = {}
  rotationIndex = null;

  getShape() {
    return this.shape;
  }

  getStructure() {
    return this.getShape().structure;
  }

  selectRotation() {
    let structure = this.getStructure();
    let rotationIndex = Math.floor(Math.random() * structure.length)
    let rotation = structure[rotationIndex];
    this.rotationIndex = rotationIndex;

    return rotation
  }

  nextRotation() {
    let structure = this.getStructure();
    let currentRotationIndex = this.rotationIndex;
    let nextRotationIndex = currentRotationIndex + 1;

    if (structure[nextRotationIndex] === undefined) {
      this.rotationIndex = 0;
      return structure[0];
    }

    this.rotationIndex = nextRotationIndex;
    return structure[nextRotationIndex];
  }

  getRotation() {
    return this.getStructure()[this.rotationIndex];
  }

  getPositions() {
    return this.positions;
  }

  clearPositions() {
    this.positions = [];
  }

  insertPosition(position) {
    this.positions.push(position);
  }
}
