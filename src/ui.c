#include "ui.h"

#include <stdio.h>
#include <string.h>

void ui_read_line(char *buffer, size_t size) {
    if (buffer == NULL || size == 0) {
        return;
    }

    if (fgets(buffer, (int)size, stdin) == NULL) {
        buffer[0] = '\0';
        return;
    }

    buffer[strcspn(buffer, "\r\n")] = '\0';
}

void ui_show_menu(void) {
    printf("1. Start adventure\n");
    printf("2. Join multiplayer room\n");
    printf("3. Quit\n");
}

void ui_prompt_player_name(char *buffer, size_t size) {
    printf("Enter player name: ");
    ui_read_line(buffer, size);
}