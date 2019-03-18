<h1 align="center">Jogo Da Velha Js</h1>

<p align="center">
  <a class="badge-align" href="https://nodei.co/npm/jogo-da-velha-js/">
  <img src="https://nodei.co/npm/jogo-da-velha-js.png?downloads=true&downloadRank=true" alt="NPM"></a>
</p>

<p align="center">
  <a class="badge-align" href="https://travis-ci.org/codermarcos/jogo-da-velha-js"><img  src="https://travis-ci.org/codermarcos/jogo-da-velha-js.svg?branch=master" alt="build Status"/></a>

  <a class="badge-align" href="https://badge.fury.io/js/jogo-da-velha-js">
  <img src="https://badge.fury.io/js/jogo-da-velha-js.svg" alt="npm version"></a>
  
  <a class="badge-align" href="https://www.npmjs.com/package/jogo-da-velha-js">
  <img src="https://img.shields.io/npm/dm/jogo-da-velha-js.svg" alt="npm Downloads"></a>
  
  <a class="badge-align" href="https://www.codacy.com/app/codermarcos/jogo-da-velha-js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=codermarcos/jogo-da-velha-js&amp;utm_campaign=Badge_Grade">
  <img src="https://api.codacy.com/project/badge/Grade/ee8f87689ae749b1822499995ef8d1d2" alt="Codacy Badge"></a>

  <a class="badge-align" href="https://opensource.org/licenses/Apache-2.0">
  <img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" alt="License"></a>
</p>

<p align="center">
  Jogo Da Velha Js desenvolvido apenas com Javascript. Para funcionar <b>Client Side</b> e <b>Server Side</b>.
  <a href="https://codermarcos.github.io/jogo-da-velha-js/">Veja a <b>demo</b></a>.
</p>

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

Leia a [documentção](docs/#readme) ou escolha sua implentação para ver um exemplo:

* [Javascript](examples/javascript/#readme)
* [Angular](examples/angular#readme)
* [React](examples/react#readme)
* [Node](examples/node#readme)
* [Vue](examples/vue#readme)

Exemplo simples usando no client side (browser):

```html
<body>
  <div position="0"></div>
  <div position="1"></div>
  <div position="2"></div>

  <div position="3"></div>
  <div position="4"></div>
  <div position="5"></div>

  <div position="6"></div>
  <div position="7"></div>
  <div position="8"></div>
  <script src="../../lib/jogo-da-velha.js"></script>

  <script>
    const game = new Game({
      onfinish(e) {
        console.log('game end', e);
      },
      onnext(e) {
        console.log('game next', e.next);
        console.log('game remaining', e.remaining);
      },
      onstart() {
        console.log('game start');
      }
    });
    
    document
      .querySelectorAll('[position]')
      .forEach(el =>
        el.addEventListener('click',
          ev => {
            try {
              const p = el.getAttribute('position');
              el.textContent = game.next;
              game.next.play({ p });
            } catch (e) {
              alert(e);
            }
          }
        )
      );
  </script>
</body>
```
