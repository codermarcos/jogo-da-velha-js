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

    const checkWinner = () => this.winner && this.onfinish(this.winner);
    const _players = new Players(params ? params.players : null);
    const _board = new Board(params ? params.board : null);
    const _this = this;
    let _next = -1;

    this.reset = () => _board.reset();
    this.next = {
      play({ p, x, y }) {
        p = parseInt(p, 10);
        if (!Number.isNaN(p)) {
          y = Math.ceil((p + 1) / 3) - 1;
          x = p % 3;
        } else {
          y = parseInt(y, 10);
          x = parseInt(x, 10);

          if (Number.isNaN(y)) { throw new Error('When p is not defined y should be define'); }
          if (Number.isNaN(x)) { throw new Error('When p is not defined x should be define'); }
        }

        if (_board[y][x] !== 0) {
          throw new Error(`This position has already been played by ${_players[_board[y][x]]}`);
        } else {
          _board[y][x] = _next;
          const { winner, remaining } = _board;

          if (winner || remaining === 0) {
            _this.onfinish(this.player || 'draw');
          } else {
            this.player = _next === 1 ? -1 : 1;
            _this.onnext({ next: this.player, remaining: _board.remaining });
          }
        }
      },
    };

    Object.defineProperty(this, 'winner', {
      get() {
        const { winner } = _board;
        return _players[winner];
      }
    });

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
        const board = _board.replace(_players);
        board.remaining = _board.remaining;
        return board;
      },
      set(value) {
        value.forEach(
          (vy, y) => vy.forEach(
            (vx, x) => _board[y][x] = _players[vx]
          )
        );
        checkWinner();
      }
    });

    this.onstart();
    checkWinner();
  }
};
