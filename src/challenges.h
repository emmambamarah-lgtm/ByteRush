#ifndef CHALLENGES_H
#define CHALLENGES_H

#include <stddef.h>

typedef struct Challenge {
    int id;
    const char *title;
    const char *prompt;
    const char *expected_keyword;
    int reward_points;
} Challenge;

const Challenge *challenges_get_all(size_t *count);
int challenges_check_answer(const Challenge *challenge, const char *answer);

#endif