const chai = require('chai');

const JogoDaVelha = require('../src/index');

let game;
chai.should();

describe('index', () => {
  beforeEach(() => {
    game = new JogoDaVelha();
  });

  describe('smook tests', () => {
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
  });
});
