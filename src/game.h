#ifndef GAME_H
#define GAME_H

#include "network.h"
#include "player.h"

typedef struct Game {
    Player player;
    NetworkState network;
    int current_mission;
    int running;
    const char *database_path;
} Game;

void game_init(Game *game, const char *player_name, const char *database_path);
void game_run(Game *game);
void game_shutdown(Game *game);

#endif