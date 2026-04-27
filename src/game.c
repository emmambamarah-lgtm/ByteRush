#include "game.h"

#include "challenges.h"
#include "database.h"
#include "renderer.h"
#include "ui.h"

#include <stdio.h>

static void game_finish(Game *game, int completed_all_missions) {
    if (game == NULL) {
        return;
    }

    game->running = 0;
    if (completed_all_missions) {
        printf("\nAdventure complete. Final score: %d\n", game->player.score);
        return;
    }

    printf("\nOut of energy. Final score: %d\n", game->player.score);
}

void game_init(Game *game, const char *player_name, const char *database_path) {
    if (game == NULL) {
        return;
    }

    player_init(&game->player, player_name);
    network_init(&game->network);
    game->current_mission = 0;
    game->running = 1;
    game->database_path = database_path;
    database_init(database_path);
}

void game_run(Game *game) {
    char answer[512];
    size_t count = 0;
    const Challenge *challenges;
    int completed_all_missions = 0;

    if (game == NULL) {
        return;
    }

    challenges = challenges_get_all(&count);
    renderer_draw_title();

    while (game->running && game->current_mission < (int)count) {
        const Challenge *challenge = &challenges[game->current_mission];

        renderer_draw_hud(&game->player, game->current_mission, (int)count);
        renderer_draw_challenge(challenge);
        printf("Your code answer: ");
        ui_read_line(answer, sizeof(answer));

        if (challenges_check_answer(challenge, answer)) {
            player_add_score(&game->player, challenge->reward_points);
            player_add_energy(&game->player, -5);
            renderer_draw_result(1, "Challenge completed.");
            game->current_mission++;

            if (game->current_mission >= (int)count) {
                completed_all_missions = 1;
                game_finish(game, 1);
            }
        } else {
            player_add_energy(&game->player, -10);
            renderer_draw_result(0, "Expected keyword not found. Try again.");

            if (game->player.energy <= 0) {
                game_finish(game, 0);
            }
        }
    }

    if (!database_save_score(game->database_path, &game->player)) {
        printf("Score could not be saved.\n");
    }

    if (!completed_all_missions && game->player.energy > 0 && game->running) {
        game_finish(game, 1);
    }
}

void game_shutdown(Game *game) {
    if (game != NULL) {
        network_disconnect(&game->network);
    }

    database_shutdown();
}