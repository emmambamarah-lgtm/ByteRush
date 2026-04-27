#include "player.h"

#include <stdio.h>
#include <string.h>

void player_init(Player *player, const char *name) {
    if (player == NULL) {
        return;
    }

    memset(player, 0, sizeof(*player));
    player->energy = 100;
    player->level = 1;

    if (name != NULL && name[0] != '\0') {
        strncpy(player->name, name, sizeof(player->name) - 1);
        player->name[sizeof(player->name) - 1] = '\0';
    } else {
        strncpy(player->name, "Explorer", sizeof(player->name) - 1);
        player->name[sizeof(player->name) - 1] = '\0';
    }
}

void player_add_energy(Player *player, int amount) {
    if (player == NULL) {
        return;
    }

    player->energy += amount;
    if (player->energy < 0) {
        player->energy = 0;
    }
    if (player->energy > 100) {
        player->energy = 100;
    }
}

void player_add_score(Player *player, int amount) {
    if (player == NULL) {
        return;
    }

    player->score += amount;
    if (player->score < 0) {
        player->score = 0;
    }
}

void player_print(const Player *player) {
    if (player == NULL) {
        return;
    }

    printf("Player: %s | Level: %d | Energy: %d | Score: %d\n",
           player->name,
           player->level,
           player->energy,
           player->score);
}