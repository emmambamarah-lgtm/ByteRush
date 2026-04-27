#include "game.h"
#include "network.h"
#include "ui.h"

#include <stdio.h>

int main(void) {
    Game game;
    char player_name[64];
    char room_code[16];
    char choice[8];

    ui_show_menu();
    printf("Choose an option: ");
    ui_read_line(choice, sizeof(choice));

    if (choice[0] == '3') {
        printf("Goodbye.\n");
        return 0;
    }

    ui_prompt_player_name(player_name, sizeof(player_name));
    game_init(&game, player_name, "database/scores.db");

    if (choice[0] == '2') {
        printf("Enter room code: ");
        ui_read_line(room_code, sizeof(room_code));
        if (network_join_room(&game.network, room_code)) {
            printf("Connected to room %s\n", game.network.room_code);
        } else {
            printf("Unable to join room. Continuing in solo mode.\n");
        }
    }

    game_run(&game);
    game_shutdown(&game);
    return 0;
}