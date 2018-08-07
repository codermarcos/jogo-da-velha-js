const Board = require('./board');
const Players = require('./players');

module.exports = class JogoDaVelha {
  constructor(params) {
    this.onstart = () => { };
    this.onnext = () => { };
    this.onfinish = () => { };

    if (params) {
      this.onstart = params.onstart || this.onstart;
      this.onnext = params.onnext || this.onnext;
      this.onfinish = params.onfinish || this.onfinish;
    }

    const _players = new Players();
    let _board = new Board();
    let _next = -1;

    this.next = {
      play({ p, x, y }) {
        if (p) {
          y = Math.ceil(p / 3) - 1;
          x = p % 3;
        }

        this.onnext();
        _board[y][x] = this.next.player;

        const { winner } = _board;
        if (winner) {
          this.onfinish(_players[winner]);
        } else {
          this.next.player = this.next.player === 1 ? -1 : 1;
        }
      },
    };

    Object.defineProperty(this.next, 'player', {
      get() {
        return _players[_next];
      },
      set(value) {
        _next = Number.isNaN(value) || Math.abs(value) !== 1 ? _players[value] : value;
      },
    });

    Object.defineProperty(this, 'board', {
      get() {
        return _board.map(
          vy => vy.map(
            vx => _players[vx]
          )
        );
      },
      set(value) {
        _board = value.map(
          vy => vy.map(
            vx => _players[vx]
          )
        );
      }
    });

    this.onstart();
  }
};
