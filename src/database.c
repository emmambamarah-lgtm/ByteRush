#include "database.h"

#include <errno.h>
#include <stdio.h>
#include <string.h>

#ifdef _WIN32
#include <direct.h>
#define MKDIR(path) _mkdir(path)
#else
#include <sys/stat.h>
#include <sys/types.h>
#define MKDIR(path) mkdir(path, 0777)
#endif

static int database_ready = 0;

static int database_ensure_parent_dir(const char *db_path) {
    char directory[260];
    const char *last_separator;
    size_t length;

    if (db_path == NULL) {
        return 0;
    }

    last_separator = strrchr(db_path, '/');
#ifdef _WIN32
    {
        const char *windows_separator = strrchr(db_path, '\\');
        if (windows_separator != NULL && (last_separator == NULL || windows_separator > last_separator)) {
            last_separator = windows_separator;
        }
    }
#endif

    if (last_separator == NULL) {
        return 1;
    }

    length = (size_t)(last_separator - db_path);
    if (length == 0 || length >= sizeof(directory)) {
        return 0;
    }

    memcpy(directory, db_path, length);
    directory[length] = '\0';

    if (MKDIR(directory) == 0 || errno == EEXIST) {
        return 1;
    }

    return 0;
}

int database_init(const char *db_path) {
    FILE *file;

    if (db_path == NULL) {
        return 0;
    }

    if (!database_ensure_parent_dir(db_path)) {
        return 0;
    }

    file = fopen(db_path, "ab+");
    if (file == NULL) {
        return 0;
    }

    fclose(file);
    database_ready = 1;
    return 1;
}

int database_save_score(const char *db_path, const Player *player) {
    FILE *file;

    if (!database_ready || db_path == NULL || player == NULL) {
        return 0;
    }

    file = fopen(db_path, "ab");
    if (file == NULL) {
        return 0;
    }

    fprintf(file,
            "name=%s;level=%d;energy=%d;score=%d\n",
            player->name,
            player->level,
            player->energy,
            player->score);
    fclose(file);
    return 1;
}

void database_shutdown(void) {
    database_ready = 0;
}