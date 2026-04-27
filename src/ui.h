#ifndef UI_H
#define UI_H

#include <stddef.h>

void ui_read_line(char *buffer, size_t size);
void ui_show_menu(void);
void ui_prompt_player_name(char *buffer, size_t size);

#endif