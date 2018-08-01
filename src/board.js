class Board extends Array {
  constructor(board) {
    const empty = [0, 0, 0];
    super(...board || [empty, empty, empty]);
    this.reset = () => this.forEach((_, i) => this[i] = empty);
  }  
}
