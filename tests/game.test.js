const chai = require('chai');
const spies = require('chai-spies');

const Game = require('../src/game');

let game;
chai.should();
chai.use(spies);

describe('game', () => {
  describe('smook', () => {
    beforeEach(() => {
      game = new Game();
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
    describe('with empty board', () => {
      before(() => {
        game = new Game();
      });
      it(
        'has correct board',
        () => {
          game.board.should.have.lengthOf(3);
          game.board[0].should.to.eql(new Array(undefined, undefined, undefined));
          game.board[1].should.to.eql(new Array(undefined, undefined, undefined));
          game.board[2].should.to.eql(new Array(undefined, undefined, undefined));
        }
      );
      it(
        'should play next',
        () => {
          const spy = chai.spy.on(game.next, 'play');
          game.next.play({ p: 1 });
          spy.should.have.been.called();
          game.board[0].should.to.eql(new Array(undefined, 'x', undefined));
        }
      );
      it(
        'should not permit play on same position',
        () => {
          let error = '';
          try {
            game.next.play({ p: 1 });
          } catch (e) {
            error = e.message;
          }
          error.should.to.equal('This position has already been played by x');
        }
      );
      it(
        'reset',
        () => {
          const spy = chai.spy.on(game, 'reset');
          game.reset();
          spy.should.have.been.called();
          game.board.should.have.lengthOf(3);
          game.board[0].should.to.eql(new Array(undefined, undefined, undefined));
          game.board[1].should.to.eql(new Array(undefined, undefined, undefined));
          game.board[2].should.to.eql(new Array(undefined, undefined, undefined));
        }
      );
    });
    describe('with instance board', () => {
      before(() => {
        const board = [
          [0, 0, 1],
          [0, 1, 1],
          [1, 1, 0]
        ];

        game = new Game({ board });
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
        'has correct winner',
        () => {
          game.winner.should.to.equal('o');
          game.board = [
            [0, 0, 1],
            [0, 0, 1],
            [1, 1, 0]
          ];
          game.should.to.not.own.property('winner');
        }
      );
      it(
        'reset',
        () => {
          const spy = chai.spy.on(game, 'reset');
          game.reset();
          spy.should.have.been.called();
          game.board.should.have.lengthOf(3);
          game.board[0].should.to.eql(new Array(undefined, undefined, undefined));
          game.board[1].should.to.eql(new Array(undefined, undefined, undefined));
          game.board[2].should.to.eql(new Array(undefined, undefined, undefined));
        }
      );
    });
  });
});