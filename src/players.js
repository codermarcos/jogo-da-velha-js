module.exports = class Players {
  constructor(p1, p2) {
    p1 = p1 || 'x';
    p2 = p2 || 'o';

    this[p1] = -1;
    this[p2] = 1;

    this[-1] = p1;
    this[1] = p2;
  }
};
