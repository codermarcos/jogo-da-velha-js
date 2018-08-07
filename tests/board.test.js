const chai = require('chai');
const Board = require('../src/board');

let board;
chai.should();

describe('board', () => {
  beforeEach(() => {
    board = new Board();
  });

  describe('smook tests', () => {
    it(
      'is instance of array',
      () => {
        board.should.be.an.instanceOf(Array);
      }
    );
    it(
      'start with correct',
      () => {
        board.should.have.lengthOf(3);
        board.should.to.deep.not.includes(1);
        board.should.to.deep.not.includes(-1);
        board.should.to.deep.include(new Array(0, 0, 0));
      }
    );
    it(
      'has function reset',
      () => {
        board.should.have.property('reset');
        board.reset.should.be.an.instanceOf(Function);
      }
    );
  });
});
