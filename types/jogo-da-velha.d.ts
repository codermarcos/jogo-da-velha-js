interface IBoard extends Array<Array<number>> {
  readonly remaining?: number;
}

interface IPlayers {
  p1: string;
  p2: string;
}

interface IPosition {
  p: number;
}

interface ILocation {
  x: number;
  y: number;
}

interface INextPlayer {
  play(position: IPosition | ILocation): void;
  player: string;
}

interface INextEvent { 
  next: string, 
  remaining: number 
}

interface IJogoDaVelhaJs {
  board?: IBoard;
  players?: IPlayers;
  onstart?(): void;
  onnext?(event: INextEvent): void;
  onfinish?(event: string | 'DRAW'): void;
}

declare class JogoDaVelhaJs {
  constructor(options?: IJogoDaVelhaJs);
  public onstart(): void;
  public onnext(event: INextEvent): void;
  public onfinish(event: string | 'DRAW'): void;
  public reset(): void;
  public readonly board: IBoard;
  public readonly next: INextPlayer;
  public readonly winner: string | undefined;
}

declare module JogoDaVelhaJs {
  export function Game(players: any): JogoDaVelhaJs;
}

declare module 'jogo-da-velha-js' {
  export = JogoDaVelhaJs;
}

