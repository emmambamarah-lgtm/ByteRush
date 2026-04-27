# web-learning-game

web-learning-game is a small hybrid learning project with two parts:

- a C codebase organized in modules for gameplay, player management, challenges, rendering, UI, database and networking
- a browser version in the web folder based on the ByteRush prototype you provided

## Project structure

```text
web-learning-game/
├── src/
│   ├── main.c
│   ├── game.c / game.h
│   ├── player.c / player.h
│   ├── challenges.c / challenges.h
│   ├── database.c / database.h
│   ├── network.c / network.h
│   ├── renderer.c / renderer.h
│   └── ui.c / ui.h
├── assets/
│   ├── fonts/
│   ├── images/
│   └── sounds/
├── web/
│   ├── index.html
│   ├── L1-html.html
│   ├── style.css
│   └── script.js
├── database/
│   └── scores.db
├── Makefile
└── README.md
```

## Web version

Open web/index.html in a browser to launch the ByteRush menu.

Features included:

- animated landing page
- four HTML learning missions
- live preview in an iframe
- progression saved in localStorage
- completion screen and replay flow

## C version

The C application is a simple console prototype that mirrors the same educational idea:

- modular code split across source files
- player state and score tracking
- challenge validation using expected keywords
- room joining stub for multiplayer
- score persistence in database/scores.db

Note: the current database module creates and appends to scores.db without linking against sqlite3, so the project stays easy to compile. If you want a real SQLite-backed implementation, that module can be extended later.

## Build

With GCC and make available:

```sh
make
```

On Windows without make, you can compile manually:

```sh
gcc -Wall -Wextra -Werror -std=c11 -Isrc src/*.c -o web-learning-game
```

## Run

Console version:

```sh
./web-learning-game
```

Browser version:

- open web/index.html

## Next extensions

- integrate real SQLite persistence
- add real sockets for multiplayer
- connect assets from the assets folder to the web missions