const chai = require('chai');
const spies = require('chai-spies');

const JogoDaVelha = require('../src/index');

let game;
chai.should();
chai.use(spies);

describe('index', () => {
  describe('smook', () => {
    beforeEach(() => {
      game = new JogoDaVelha();
    });
    it('has correct board', () => {
      game.should.have.property('board');
      game.board.should.be.an.instanceOf(Array);
    });
    it('has correct next', () => {
      game.should.have.property('next');
      game.board.should.be.an.instanceOf(Object);

      game.next.should.have.property('play');
      game.next.play.should.be.an.instanceOf(Function);

      game.next.should.have.property('player', 'x');
    });
    
    it('has correct winner', () => {
      game.should.not.have.property('winner');
      chai.expect(game.winner).to.be.an('undefined');
    });
  });

  describe('acceptance', () => {
    before(() => {
      const board = [
        [0, 0, 1],
        [0, 1, 1],
        [1, 1, 0]
      ];

      game = new JogoDaVelha({ board });
    });
    it(
      'has correct board',
      () => {
        game.board.should.have.lengthOf(3);
        game.board[0].should.to.eql(new Array(undefined, undefined, 'o'));
        game.board[1].should.to.eql(new Array(undefined, 'o', 'o'));
        game.board[2].should.to.eql(new Array('o', 'o', undefined));
      }
    );
    it(
      'reset',
      () => {
        const spy = chai.spy.on(game.board, 'reset');
        game.board.reset();
        spy.should.have.been.called();
        game.board.should.have.lengthOf(3);
        game.board[0].should.to.eql(new Array(0, 0, 0));
        game.board[1].should.to.eql(new Array(0, 0, 0));
        game.board[2].should.to.eql(new Array(0, 0, 0));
      }
    );
  });
});
