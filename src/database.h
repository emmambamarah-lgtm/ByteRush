#ifndef DATABASE_H
#define DATABASE_H

#include "player.h"

int database_init(const char *db_path);
int database_save_score(const char *db_path, const Player *player);
void database_shutdown(void);

#endif