#ifndef PLAYER_H
#define PLAYER_H

#include <stddef.h>

typedef struct Player {
    char name[64];
    int energy;
    int score;
    int level;
} Player;

void player_init(Player *player, const char *name);
void player_add_energy(Player *player, int amount);
void player_add_score(Player *player, int amount);
void player_print(const Player *player);

#endif