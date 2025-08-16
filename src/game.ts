import { MoveX, MoveO, State, type MoveSymbols, type MoveValues } from "./state.ts";
import { Board, type BoardInput } from "./board.ts";

export class Game {
  public readonly board: Board;
  public readonly onStart?: (game: Game) => void;
  public readonly first: MoveSymbols | MoveValues;
  public readonly onNext?: (next: { player: MoveX | MoveO; remaining: number }) => void;
  public readonly onFinish?: (winner?: MoveX | MoveO) => void;

  constructor({ first, onStart, onNext, onFinish, board }: Pick<Partial<Game>, 'first' | 'onStart' | 'onNext' | 'onFinish'> & { board?: BoardInput } = {}) {
    this.onStart = onStart;
    this.onNext = onNext;
    this.onFinish = onFinish;

    this.first = first ?? -1;
    this.board = new Board(board);

    this.onStart?.(this);
  }

  public get next(): MoveX | MoveO {
    const first = this.first === 1 ? 1 : 0;
    return State.from(this.board.remaining % 2 === first ? 'O' : 'X');
  }

  public get winner(): MoveX | MoveO | undefined {
    const rules = [
      // Rows
      [0, 1, 2] as const,
      [3, 4, 5] as const,
      [6, 7, 8] as const,
      // Columns
      [0, 3, 6] as const,
      [1, 4, 7] as const,
      [2, 5, 8] as const,
      // Diagonals
      [0, 4, 8] as const,
      [2, 4, 6] as const,
    ];

    for (const [p1, p2, p3] of rules) {
      const { [p1]: v1, [p2]: v2, [p3]: v3 } = this.board;
      const result = v1.valueOf() + v2.valueOf() + v3.valueOf();

      if (Math.abs(result) === 3) return State.from(Math.sign(result) as MoveValues);
    }
  }

  public play(move: Parameters<typeof Board.getPosition>[number]): void {
    const { remaining } = this.board;
    if (remaining === 0 || !!this.winner) throw new Error('Game is already finished');

    this.board.set(move, this.next);

    const { winner } = this;

    if (remaining === 1 || winner) {
      this.onFinish?.(winner);
    } else {
      this.onNext?.({ player: this.next, remaining: this.board.remaining });
    }
  }

  public reset(): void {
    this.board.reset();
    this.onStart?.(this);
  }
}
