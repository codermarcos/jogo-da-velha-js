import { describe, beforeEach, it } from 'node:test';
import assert from 'node:assert';

import { Board } from "./board.ts";

describe('Board', () => {
  describe('empty', () => {
    let board: Board;

    beforeEach(() => {
      board = new Board();
    });

    it(
      'start correct',
      () => {
        assert.equal(board.toArray().join(''), '         ', 'Board should be empty');
        assert.strictEqual(board.length, 9, 'Board should have length of 9');
        assert.strictEqual(board.remaining, 9, 'Board should have 9 remaining positions');
        assert.strictEqual(typeof board.set, 'function', 'Board should have set function');
        assert.strictEqual(typeof board.reset, 'function', 'Board should have a reset function');
      }
    );
  });


  describe('predefined', () => {
    let board: Board;

    beforeEach(() => {
      board = new Board([
        0, 0, 1,
        0, 1, -1,
        1, -1, 0
      ]);
    });
    it(
      'start with correct',
      () => {
        assert.strictEqual(board.remaining, 4, 'Board should have 4 remaining positions');
        assert.deepStrictEqual(board.toArray().join(''), '  O OXOX ', 'Board should match predefined state');
      }
    );
    it(
      'reset',
      () => {
        board.reset();
        assert.strictEqual(board.remaining, 9, 'Board should have 9 remaining positions after reset');
        assert.deepStrictEqual(board.toArray().join(''), '         ', 'Board should be cleared after reset');
      }
    );

    it(
      'toString',
      () => {
        assert.deepStrictEqual(
          board.toString(), [
            '   |   | O ',
            '---+---+---',
            '   | O | X ',
            '---+---+---',
            ' O | X |   ',
          ].join('\n'), 'Board should match predefined state');
      }
    );
  });
});
