(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Game = factory());
}(this, (function () { 'use strict';

  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var board = function (_Array) {
    _inherits(Board, _Array);

    function Board(board) {
      var _ref;

      _classCallCheck(this, Board);

      var _this = _possibleConstructorReturn(this, (_ref = Board.__proto__ || Object.getPrototypeOf(Board)).call.apply(_ref, [this].concat(_toConsumableArray(board || [[0, 0, 0], [0, 0, 0], [0, 0, 0]]))));

      _this.reset = function () {
        return _this.forEach(function (_, i) {
          return _this[i] = [0, 0, 0];
        });
      };
      _this.replace = function (players) {
        return _this.map(function (vy) {
          return vy.map(function (vx) {
            return players[vx];
          });
        });
      };

      Object.defineProperty(_this, 'remaining', {
        get: function get() {
          var remaining = 9;

          for (var x = 0; x <= 2; x++) {
            for (var y = 0; y <= 2; y++) {
              remaining -= Math.abs(this[x][y]);
            }
          }

          return remaining;
        }
      });

      Object.defineProperty(_this, 'winner', {
        get: function get() {
          var winner = void 0;
          var dr = 0;
          var dl = 0;

          for (var i = 0, x = 2; i <= 2; i++, x--) {
            dr += this[i][i];
            dl += this[i][x];

            switch (3) {
              case Math.abs(dr):
                winner = Math.sign(dr);
                break;

              case Math.abs(dl):
                winner = Math.sign(dl);
                break;
            }

            var h = 0;
            var v = 0;

            for (var y = 0; y <= 2; y++) {
              h += this[x][y];
              v += this[y][i];

              switch (3) {
                case Math.abs(h):
                  winner = Math.sign(h);
                  break;

                case Math.abs(v):
                  winner = Math.sign(v);
                  break;
              }
            }
          }

          return winner;
        }
      });
      return _this;
    }

    return Board;
  }(Array);

  function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var players = function Players(params) {
    _classCallCheck$1(this, Players);

    params = typeof params !== 'undefined' && params !== null ? params : {};
    params.p1 = typeof params.p1 !== 'undefined' && params.p1 !== null ? params.p1 : 'x';
    params.p2 = typeof params.p2 !== 'undefined' && params.p2 !== null ? params.p2 : 'o';

    this[params.p1] = -1;
    this[params.p2] = 1;

    this[-1] = params.p1;
    this[1] = params.p2;
  };

  function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




  var game = function Game(params) {
    var _this2 = this;

    _classCallCheck$2(this, Game);

    this.onstart = function () {};
    this.onnext = function () {};
    this.onfinish = function () {};

    if (params) {
      this.onstart = params.onstart || this.onstart;
      this.onnext = params.onnext || this.onnext;
      this.onfinish = params.onfinish || this.onfinish;
    }

    var updateWinner = function updateWinner() {
      return _this2.winner && _this2.onfinish(_this2.winner);
    };
    var _players = new players(params ? params.players : null);
    var _board = new board(params ? params.board : null);
    var _this = this;
    var _next = -1;

    this.reset = function () {
      return _board.reset();
    };
    this.next = {
      play: function play(_ref) {
        var p = _ref.p,
            x = _ref.x,
            y = _ref.y;

        p = parseInt(p, 10);
        if (!Number.isNaN(p)) {
          y = Math.ceil((p + 1) / 3) - 1;
          x = p % 3;
        } else {
          y = parseInt(y, 10);
          x = parseInt(x, 10);

          if (Number.isNaN(y)) {
            throw new Error('When p is not defined y should be define');
          }
          if (Number.isNaN(x)) {
            throw new Error('When p is not defined x should be define');
          }
        }

        if (_board[y][x] !== 0) {
          throw new Error('This position has already been played by ' + _players[_board[y][x]]);
        } else {
          _board[y][x] = _next;
          var winner = _board.winner;


          if (winner) {
            _this.winner = _players[winner];
            _this.onfinish(_this.winner);
          } else {
            delete this.winner;
            if (_board.remaining === 0) {
              _this.onfinish('draw');
            } else {
              this.player = _next === 1 ? -1 : 1;
              _this.onnext({ next: this.player, remaining: _board.remaining });
            }
          }
        }
      }
    };

    Object.defineProperty(this, 'winner', {
      get: function get() {
        var winner = _board.winner;

        return _players[winner];
      }
    });

    Object.defineProperty(this.next, 'player', {
      get: function get() {
        return _players[_next];
      },
      set: function set(value) {
        _next = Number.isNaN(value) || Math.abs(value) !== 1 ? _players[value] : value;
      }
    });

    Object.defineProperty(this, 'board', {
      get: function get() {
        var board$$1 = _board.replace(_players);
        board$$1.remaining = _board.remaining;
        return board$$1;
      },
      set: function set(value) {
        value.forEach(function (vy, y) {
          return vy.forEach(function (vx, x) {
            return _board[y][x] = _players[vx];
          });
        });
        updateWinner();
      }
    });

    this.onstart();
    updateWinner();
  };

  return game;

})));
