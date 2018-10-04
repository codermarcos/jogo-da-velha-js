module.exports = class Board extends Array {
  constructor(board) {
    super(...board || [[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    this.reset = () => this.forEach((_, i) => this[i] = [0, 0, 0]);
    this.replace = (players) => {
      return this.map(
        vy => vy.map(
          vx => players[vx]
        )
      );
    };

    Object.defineProperty(this, 'remaining', {
      get() {
        let remaining = 9;

        for (let x = 0; x <= 2; x++) {
          for (let y = 0; y <= 2; y++) {
            remaining -= Math.abs(this[x][y]);
          }
        }

        return remaining;
      }
    });

    Object.defineProperty(this, 'winner', {
      get() {
        let winner;
        let dr = 0;
        let dl = 0;

        for (let i = 0, x = 2; i <= 2; i++ , x--) {
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

          let h = 0;
          let v = 0;

          for (let y = 0; y <= 2; y++) {
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
  }
};
