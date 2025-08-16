export type MoveValues = -1 | 1;
export type MoveSymbols = 'X' | 'O';
export type StateType = MoveX | MoveO | Space;
export type StateKeys = MoveSymbols | MoveValues | ' ' | 0;

type IState = {
  [Symbol.toPrimitive](hint: 'string' | 'number' | 'default'): string | number;
  toString(): MoveSymbols | ' ';
  valueOf(): MoveValues | 0;
  isEmpty(): boolean;
}

export class MoveX implements IState {
  public readonly toJSON = () => this.toString();
  public readonly toString = () => 'X' as const;
  public readonly valueOf = () => -1 as const;
  public readonly isEmpty = () => false;
  public readonly X = -1 as const;
  public [Symbol.toPrimitive](hint: 'string' | 'number' | 'default') {
    return hint === 'number' ? -1 : 'X';
  }
}

export class MoveO implements IState {
  public readonly toJSON = () => this.toString();
  public readonly toString = () => 'O' as const;
  public readonly valueOf = () => 1 as const;
  public readonly isEmpty = () => false;
  public readonly O = 1 as const;
  public [Symbol.toPrimitive](hint: 'string' | 'number' | 'default') {
    return hint === 'number' ? 1 : 'O';
  }
}

export class Space implements IState {
  public readonly toJSON = () => this.toString();
  public toString = () => ' ' as const;
  public valueOf = () => 0 as const;
  public isEmpty = () => true;
  public [Symbol.toPrimitive](hint: 'string' | 'number' | 'default') {
    return hint === 'number' ? 0 : ' ';
  }
}

export class State {
  private static readonly empty = Object.freeze(new Space());
  private static readonly O = Object.freeze(new MoveO());
  private static readonly X = Object.freeze(new MoveX());

  static from(key: 0): Space;
  static from(key: 1): MoveO;
  static from(key: -1): MoveX;
  static from(key: ' '): Space;
  static from(key: 'O'): MoveO;
  static from(key: 'X'): MoveX;
  static from(key: MoveValues): MoveX | MoveO;
  static from(key: MoveSymbols): MoveX | MoveO;
  static from(key: StateKeys): StateType;
  static from(key: StateKeys): IState {
    if (key === 'X' || key === -1) return State.X;
    if (key === 'O' || key === 1) return State.O;
    return State.empty;
  }
}
