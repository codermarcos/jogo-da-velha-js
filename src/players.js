module.exports = class Players {
  constructor(params) {
    params = typeof params !== 'undefined' && params !== null ? params : {};
    params.p1 = typeof params.p1 !== 'undefined' && params.p1 !== null ? params.p1 : 'x';
    params.p2 = typeof params.p2 !== 'undefined' && params.p2 !== null ? params.p2 : 'o';

    this[params.p1] = -1;
    this[params.p2] = 1;

    this[-1] = params.p1;
    this[1] = params.p2;
  }
};
