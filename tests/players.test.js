const chai = require('chai');
const spies = require('chai-spies');
const Players = require('../src/players');

let players;
chai.should();
chai.use(spies);

describe('players', () => {
  beforeEach(() => {
    players = new Players();
  });

  describe('smook', () => {
    it(
      'is instance of object',
      () => {
        players.should.be.an.instanceOf(Object);
      }
    );
    it(
      'start with correct',
      () => {
        players.should.have.property('x');
        players.should.have.property('o');
        players.should.have.property(-1);
        players.should.have.property(1);
      }
    );
  });
});
