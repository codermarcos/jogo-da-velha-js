# Jogo Da Velha Js (tic-tac-toe)

This is a simple implementation for Tic-Tac-Toe. It uses OO as paradigm and with latest version of NodeJS which allow to use typescript natively it should works at client and server side. [See **demo** here](https://codermarcos.github.io/jogo-da-velha-js/)

## Getting Started

First, install it.

```shell
  npm i jogo-da-velha-js --save
```

Or use direct of github release

```html
<script src="https://github.com/codermarcos/jogo-da-velha-js/releases/download/<RELEASE_VERSION_HERE>/jogo-da-velha-js.js"></script>
```

> remember change **<RELEASE_VERSION_HERE>** by the [last version](https://github.com/codermarcos/jogo-da-velha-js/releases/latest)

Simple implementation:

```js
const game = new Game({
  onFinish(e) {
    console.log('onFinish called game end!');
    console.log('returns the winner', e);
  },
  onNext(e) {
    console.log('onNext called when start a new turn!');
    console.log('returns the player that should play this turn', e.player);
    console.log('returns the how many turns remaining', e.remaining);
  },
  onStart(g) {
    console.log('called when game start');
    console.log('returns the game instace', g);
  },

  // First player
  // first: 'X',

  // Initiate the board with some game
  // board: [
  // 'X','O',' ', 
  // ' ',' ',' ', 
  // ' ',' ','O'
  // ]
});

// Should return the player that should play
console.log(game.next.toString()); // 'X' | 'O'
// The first turn is always of 'X'

try {
  const p = 0; // position of the board like
  // |
  //\|/
  // 0 | 1 | 2 
  //---+---+---
  // 3 | 4 | 5 
  //---+---+---
  // 6 | 7 | 8 
  game.play({ p });
} catch (e) {
  alert(e);
}

// Returns a string with the board like
console.log(game.board.toString()); // X |   |   
                                    //---+---+---
                                    //   |   |   
                                    //---+---+---
                                    //   |   |   

// Returns how many avaliable spaces there are
console.log(game.board.remaining); // 8
```
