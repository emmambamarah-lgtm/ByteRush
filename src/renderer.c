#include "renderer.h"

#include <stdio.h>

void renderer_draw_title(void) {
    printf("========================================\n");
    printf(" ByteRush - Web Learning Game\n");
    printf("========================================\n");
}

void renderer_draw_hud(const Player *player, int mission_index, int mission_total) {
    if (player == NULL) {
        return;
    }

    printf("Mission: %d/%d | Energy: %d | Score: %d\n",
           mission_index + 1,
           mission_total,
           player->energy,
           player->score);
}

void renderer_draw_challenge(const Challenge *challenge) {
    if (challenge == NULL) {
        return;
    }

    printf("\n[%d] %s\n", challenge->id, challenge->title);
    printf("%s\n", challenge->prompt);
}

void renderer_draw_result(int success, const char *message) {
    printf("%s %s\n", success ? "SUCCESS:" : "ERROR:", message != NULL ? message : "");
}