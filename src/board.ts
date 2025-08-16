import { type StateType, type MoveSymbols, type MoveValues, State, type MoveO, type MoveX, type StateKeys } from './state.ts';

type BoardSpaces<T> = [T, T, T, T, T, T, T, T, T];
export type BoardPositions = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type BoardState = BoardSpaces<StateType>;
type BoardValueInput = BoardSpaces<MoveValues | 0>;
type BoardSymbolInput = BoardSpaces<MoveSymbols | ' '>;
export type BoardInput = BoardValueInput | BoardSymbolInput;

export class Board implements Iterable<StateType> {
  declare 0: StateType;
  declare 1: StateType;
  declare 2: StateType;
  declare 3: StateType;
  declare 4: StateType;
  declare 5: StateType;
  declare 6: StateType;
  declare 7: StateType;
  declare 8: StateType;

  public readonly length = 9;

  constructor(board?: BoardInput) {
    for (let index = 0; index <= this.length - 1; index += 1) {
      this[index as BoardPositions] = State.from(board?.[index] ?? 0 as StateKeys)
    }
  }

  static getPosition(move: { p: BoardPositions; } | { x: 0 | 1 | 2; y: 0 | 1 | 2 }): BoardPositions {
    return ('p' in move ? move.p : (move.y * 3 + move.x)) as BoardPositions;
  }

  public get remaining(): number {
    let n = 0;
    for (let i = 0; i < this.length; i++) if (this[i as BoardPositions].isEmpty()) n++;
    return n;
  }

  public reset(): void {
    for (let index = 0; index < this.length; index += 1)
      this[index as BoardPositions] = State.from(0);
  }

  public set(move: Parameters<typeof Board.getPosition>[number], state: MoveX | MoveO): void {
    const position = Board.getPosition(move);
    const currentState = this[position];

    if (!currentState.isEmpty())
      throw new Error(`The position ${'p' in move ? move.p : `x: ${move.x}, y: ${move.y}`} is already taken by ${currentState.toString()}`);

    this[position] = state;
  }

  public toString(): string {
    return (
      ` ${this[0]} | ${this[1]} | ${this[2]} ` +
      '\n---+---+---\n' +
      ` ${this[3]} | ${this[4]} | ${this[5]} ` +
      '\n---+---+---\n' +
      ` ${this[6]} | ${this[7]} | ${this[8]} `
    );
  }

  public toArray(): BoardState {
    return [...this] as BoardState;
  }

  public toJSON(): Array<MoveSymbols> {
    const json = [];
    for (let i = 0; i < this.length; i++) 
      json.push(this[i as BoardPositions].toString());
    return json as Array<MoveSymbols>;
  };

  public *[Symbol.iterator](index: BoardPositions = 0) {
    while (index <= 8) yield this[index++ as BoardPositions];
  };
};

