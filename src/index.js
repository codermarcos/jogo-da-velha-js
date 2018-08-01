import { Board } from './board';
import { Players } from './players';

export class JogoDaVelha {
  constructor({ onstart, onnext, onfinish }) {
    this.onstart = onstart || function(){};
    this.onnext = onnext || function(){};
    this.onfinish = onfinish || function(){};

    let _players = new Players();
    let _board = new Board();

    this.next = {
      player: -1,
      play({ p, x, y }) {
        if (p) {
          y = Math.ceil(p / 3) - 1;
          x = p % 3;
        }             

        this.onnext();
        _board[y][x] = this.next.player;

        const winner = this.winner;
        if(winner) { 
          this.onfinish(winner); 
        } else {
          this.next.player = this.next.player === 1 ? -1 : 1;
        }
      }
    }
    
    Object.defineProperty(this, 'winner', {
      get() {
        let dr = 0;
        let dl = 0;
  
        for (let i = 0, x = 2; i <= 2; x-- , i++) {
          dr += this.board[i][i];
          dl += this.board[i][x];
  
          switch (3) {
            case Math.abs(dr):
              return _players[Math.sign(dr)];
          
            case Math.abs(dl):
              return _players[Math.sign(dl)];
          }
  
          let h = 0;
          let v = 0;
  
          for (let y = 0; y <= 2; y++) {
            h += this.board[x][y];
            v += this.board[y][i];
  
            switch (3) {
              case Math.abs(h):
                return _players[Math.sign(h)];
            
              case Math.abs(v):
                return _players[Math.sign(v)];
            }
          }
        }      
      }
    });
    
    Object.defineProperty(this, 'board', {
      get() {
        return _board.map(
          vy => vy.map(
            vx => _players[vx]
          )
        );
      },
      set(value) {
        _board = value.map(
          vy => vy.map(
            vx => _players[vx]
          )
        );
      }
    });
    
    this.onstart();
  }
}

module.exports = new JogoDaVelha();
