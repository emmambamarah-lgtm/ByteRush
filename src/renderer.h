#ifndef RENDERER_H
#define RENDERER_H

#include "player.h"
#include "challenges.h"

void renderer_draw_title(void);
void renderer_draw_hud(const Player *player, int mission_index, int mission_total);
void renderer_draw_challenge(const Challenge *challenge);
void renderer_draw_result(int success, const char *message);

#endif