import { describe, it } from 'node:test';
import assert from 'node:assert';

import { State } from './state.ts';

describe('State', () => {
  describe('Space', () => {
    it(
      'Instance of Space with "0"',
      () => {
        const state = State.from(0);
        assert.ok(state.isEmpty(), 'Should be empty');
        assert.deepStrictEqual(state.valueOf(), 0, 'Player should have a value of 0');
        assert.deepStrictEqual(state.toString(), ' ', 'Player should have a symbol of " "');
      }
    );

    it(
      'Instance of Space with " "',
      () => {
        const state = State.from(' ');
        assert.ok(state.isEmpty(), 'Should be empty');
        assert.deepStrictEqual(state.valueOf(), 0, 'Player should have a value of 0');
        assert.deepStrictEqual(state.toString(), ' ', 'Player should have a symbol of " "');
      }
    );
  });

  describe('MoveX', () => {
    it(
      'Instance of MoveX with "-1"',
      () => {
        const state = State.from(-1);
        assert.equal(state.X, -1, 'Should have a property for "X"');
        assert.ok(!state.isEmpty(), 'Should have a property for "X"');
        assert.deepStrictEqual(state.valueOf(), -1, 'Player should have a value of -1');
        assert.deepStrictEqual(state.toString(), 'X', 'Player should have a symbol of "X"');
      }
    );

    it(
      'Instance of MoveX with "X"',
      () => {
        const state = State.from('X');
        assert.equal(state.X, -1, 'Should have a property for "X"');
        assert.ok(!state.isEmpty(), 'Should have a property for "X"');
        assert.deepStrictEqual(state.valueOf(), -1, 'Player should have a value of -1');
        assert.deepStrictEqual(state.toString(), 'X', 'Player should have a symbol of "X"');
      }
    );
  });

  describe('MoveO', () => {
    it(
      'Instance of MoveX with "1"',
      () => {
        const state = State.from(1);
        assert.equal(state.O, 1, 'Should have a property "O" with 1');
        assert.ok(!state.isEmpty(), 'Should have a property for "O"');
        assert.deepStrictEqual(state.valueOf(), 1, 'Player should have a value of 1');
        assert.deepStrictEqual(state.toString(), 'O', 'Player should have a symbol of "O"');
      }
    );

    it(
      'Instance of MoveX with "O"',
      () => {
        const state = State.from('O');
        assert.equal(state.O, 1, 'Should have a property "O" with 1');
        assert.ok(!state.isEmpty(), 'Should have a property for "O"');
        assert.deepStrictEqual(state.valueOf(), 1, 'Player should have a value of 1');
        assert.deepStrictEqual(state.toString(), 'O', 'Player should have a symbol of "O"');
      }
    );
  });
});
