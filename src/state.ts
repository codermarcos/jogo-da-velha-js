export type MoveValues = -1 | 1;
export type MoveSymbols = 'X' | 'O';
export type StateType = MoveX | MoveO | Space;
export type StateKeys = MoveSymbols | MoveValues | ' ' | 0;

type IState = {
	[Symbol.toPrimitive](hint: 'string' | 'number' | 'default'): string | number;
	toString(): MoveSymbols | ' ';
	valueOf(): MoveValues | 0;
	isEmpty(): boolean;
};

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
	public readonly toString = () => ' ' as const;
	public readonly valueOf = () => 0 as const;
	public readonly isEmpty = () => true;
	public [Symbol.toPrimitive](hint: 'string' | 'number' | 'default') {
		return hint === 'number' ? 0 : ' ';
	}
}

function from(key: 0): Space;
function from(key: 1): MoveO;
function from(key: -1): MoveX;
function from(key: ' '): Space;
function from(key: 'O'): MoveO;
function from(key: 'X'): MoveX;
function from(key: MoveValues): MoveX | MoveO;
function from(key: MoveSymbols): MoveX | MoveO;
function from(key: StateKeys): StateType;

function from(key: StateKeys): IState {
	if (key === 'X' || key === -1) return State.X;
	if (key === 'O' || key === 1) return State.O;
	return State.empty;
}

export const State = Object.freeze({
	empty: Object.freeze(new Space()),
	O: Object.freeze(new MoveO()),
	X: Object.freeze(new MoveX()),
	from,
} as const);
