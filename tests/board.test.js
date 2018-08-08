const chai = require('chai');
const spies = require('chai-spies');
const Board = require('../src/board');

let board;
chai.should();
chai.use(spies);

describe('board', () => {
  describe('smook', () => {
    beforeEach(() => {
      board = new Board();
    });
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
      'has winner undefined',
      () => {
        board.should.have.property('winner');
        chai.expect(board.winner).to.be.an('undefined');
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

  describe('acceptance', () => {
    before(() => {
      const _board = [
        [0, 0, 1],
        [0, 1, 1],
        [1, 1, 0]
      ];

      board = new Board(_board);
    });
    it(
      'start with correct',
      () => {
        board.should.have.lengthOf(3);
        board[0].should.to.eql(new Array(0, 0, 1));
        board[1].should.to.eql(new Array(0, 1, 1));
        board[2].should.to.eql(new Array(1, 1, 0));
      }
    );
    it(
      'has winner',
      () => {
        board.should.have.property('winner');
        chai.expect(board.winner).equal(1);
      }
    );
    it(
      'reset',
      () => {
        const spy = chai.spy.on(board, 'reset');
        board.reset();
        spy.should.have.been.called();
        board.should.have.lengthOf(3);
        board[0].should.to.eql(new Array(0, 0, 0));
        board[1].should.to.eql(new Array(0, 0, 0));
        board[2].should.to.eql(new Array(0, 0, 0));
      }
    );
  });
});
