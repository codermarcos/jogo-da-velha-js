const Board = require('./board');
const Players = require('./players');

module.exports = class Game {
  constructor(params) {
    this.onstart = () => { };
    this.onnext = () => { };
    this.onfinish = () => { };

    if (params) {
      this.onstart = params.onstart || this.onstart;
      this.onnext = params.onnext || this.onnext;
      this.onfinish = params.onfinish || this.onfinish;
    }

    const _players = new Players(params ? params.players : null);
    const _board = new Board(params ? params.board : null);
    const _this = this;
    let _next = -1;

    const updateWinner = () => {
      let { winner } = _board;
      if (winner) {
        this.winner = _players[winner];
        this.onfinish(this.winner);
      } else {
        delete this.winner;
        winner = false;
      }
      return winner;
    };

    this.reset = () => _board.reset();
    this.next = {
      play({ p, x, y }) {
        if (typeof p !== 'undefined' && p !== null) {
          y = Math.ceil(p / 3) - 1;
          x = p % 3;
        }

        if (_board[y][x] !== 0) {
          throw new Error(`This position has already been played by ${_players[_board[y][x]]}`);
        } else {
          _this.onnext();
          _board[y][x] = _next;
          this.player = updateWinner() || _next === 1 ? -1 : 1;
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
        value.forEach(
          (vy, y) => vy.forEach(
            (vx, x) => _board[y][x] = _players[vx]
          )
        );
        updateWinner();
      }
    });

    this.onstart();
    updateWinner();
  }
};
