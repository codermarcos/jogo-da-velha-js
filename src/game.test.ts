import { describe, it } from 'node:test';
import assert, { AssertionError } from 'node:assert';

import { Game } from './game.ts';
import type { MoveO, MoveX } from './state.ts';

describe('Game', () => {
  describe('start', () => {
    it(
      'should initialize with an empty board',
      () => {
        const game = new Game();
        assert.strictEqual(game.board.remaining, 9, 'Game should start with 9 remaining positions');
        assert.deepStrictEqual(game.winner, undefined, 'Game should not have a winner at start');
      }
    );

    it(
      'should call onStart callback',
      () => {
        let called = false;

        new Game({
          onStart: () => { called = true; }
        });

        assert.ok(called, 'onStart callback should be called on initialization');
      }
    );
  });

  describe('play', () => {
    it(
      'should allow players play properly',
      () => {
        const game = new Game();
        game.play({ p: 0 });
        assert.strictEqual(game.board[0].toString(), 'X', 'Player 1 should have played in position 0');
        assert.strictEqual(game.next.toString(), 'O', 'Next player should be Player 2');

        game.play({ p: 1 });
        assert.strictEqual(game.board[1].toString(), 'O', 'Player 2 should have played in position 1');
        assert.strictEqual(game.next.toString(), 'X', 'Next player should be Player 1');

        try {
          game.play({ p: 1 });
        } catch (error) {
          assert.ok(AssertionError.isError(error), 'Should be an error');
          assert.strictEqual(error.message, 'The position 1 is already taken by O', 'Should no allow play when has winner');
        }

        game.play({ p: 2 });

        try {
          game.play({ p: 1 });
        } catch (error) {
          assert.ok(AssertionError.isError(error), 'Should be an error');
          assert.strictEqual(error.message, 'The position 1 is already taken by O', 'Should no allow play when has winner');
        }
      }
    );

    it(
      'should call onNext callback',
      () => {
        let called = false;
        let next: { player: MoveX | MoveO, remaining: number } | undefined;
        const game = new Game({
          onNext: (n) => { called = true; next = n; }
        });
        game.play({ p: 0 });
        assert.ok(called, 'onNext callback should be called after a valid move');
        assert.strictEqual(next?.player.toString(), 'O', 'Next player should be Player 2');
        assert.strictEqual(next?.remaining, 8, 'Board should have 8 remaining positions');
      }
    );

    it(
      'should call onFinish callback',
      () => {
        let called = false;
        let winner: MoveX | MoveO | undefined;
        const game = new Game({
          onFinish: (w) => { called = true; winner = w; }
        });
        game.play({ p: 0 });
        console.log(game.board.remaining);
        game.play({ p: 1 });
        console.log(game.board.remaining);
        game.play({ p: 2 });
        console.log(game.board.remaining);
        game.play({ p: 3 });
        console.log(game.board.remaining);
        game.play({ p: 4 });
        console.log(game.board.remaining);
        game.play({ p: 5 });
        console.log(game.board.remaining);
        game.play({ p: 6 });

        assert.ok(called, 'onFinish callback should be called when the game is over');
        assert.equal(winner?.toString?.(), 'X', 'Game should has winner');
        assert.strictEqual(game.board.remaining, 2, 'Game should end remainig 2 moves');

        try {
          game.play({ p: 7 });
        } catch (error) {
          assert.ok(AssertionError.isError(error), 'Should be an error');
          assert.strictEqual(error.message, 'Game is already finished', 'Should no allow play when has winner');
        }
      }
    );
  });
});
