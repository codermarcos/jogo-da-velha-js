(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.JogoDaVelha = factory());
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

      var empty = [0, 0, 0];

      var _this = _possibleConstructorReturn(this, (_ref = Board.__proto__ || Object.getPrototypeOf(Board)).call.apply(_ref, [this].concat(_toConsumableArray(board || [empty, empty, empty]))));

      _this.reset = function () {
        return _this.forEach(function (_, i) {
          return _this[i] = empty;
        });
      };

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

  var board$1 = /*#__PURE__*/Object.freeze({
    default: board,
    __moduleExports: board
  });

  function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var players = function Players(p1, p2) {
    _classCallCheck$1(this, Players);

    p1 = p1 || 'x';
    p2 = p2 || 'o';

    this[p1] = -1;
    this[p2] = 1;

    this[-1] = p1;
    this[1] = p2;
  };

  var players$1 = /*#__PURE__*/Object.freeze({
    default: players,
    __moduleExports: players
  });

  var Board = ( board$1 && board ) || board$1;

  var Players = ( players$1 && players ) || players$1;

  function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




  var src = function JogoDaVelha(params) {
    _classCallCheck$2(this, JogoDaVelha);

    this.onstart = function () {};
    this.onnext = function () {};
    this.onfinish = function () {};

    if (params) {
      this.onstart = params.onstart || this.onstart;
      this.onnext = params.onnext || this.onnext;
      this.onfinish = params.onfinish || this.onfinish;
    }

    var _players = new Players();
    var _board = new Board();
    var _next = -1;

    this.next = {
      play: function play(_ref) {
        var p = _ref.p,
            x = _ref.x,
            y = _ref.y;

        if (p) {
          y = Math.ceil(p / 3) - 1;
          x = p % 3;
        }

        this.onnext();
        _board[y][x] = this.next.player;

        var _board2 = _board,
            winner = _board2.winner;

        if (winner) {
          this.onfinish(_players[winner]);
        } else {
          this.next.player = this.next.player === 1 ? -1 : 1;
        }
      }
    };

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
        return _board.map(function (vy) {
          return vy.map(function (vx) {
            return _players[vx];
          });
        });
      },
      set: function set(value) {
        _board = value.map(function (vy) {
          return vy.map(function (vx) {
            return _players[vx];
          });
        });
      }
    });

    this.onstart();
  };

  return src;

})));
