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
      game.should.have.property('winner', undefined);
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
        'should have remaining with 8',
        () => {
          game.board.should.have.property('remaining', 9);
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
        'should reduce remaining on play',
        () => {
          game.board.should.have.property('remaining', 8);
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
        'should require y without p',
        () => {
          let error = '';
          try {
            game.next.play({});
          } catch (e) {
            error = e.message;
          }
          error.should.to.equal('When p is not defined y should be define');
        }
      );
      it(
        'should require x without p',
        () => {
          let error = '';
          try {
            game.next.play({ y: 1 });
          } catch (e) {
            error = e.message;
          }
          error.should.to.equal('When p is not defined x should be define');
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
          game.should.have.property('winner', undefined);
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
