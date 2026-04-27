#include "challenges.h"

#include <string.h>

static const Challenge CHALLENGES[] = {
    {1, "The Silent Tree", "Add a heading to name the tree.", "h1", 30},
    {2, "The Lost Path", "Create three list items for the path.", "li", 30},
    {3, "The Glowing Signs", "Add an image and a link.", "href", 30},
    {4, "The First Clearing", "Combine text, list, image and link.", "div", 30},
};

const Challenge *challenges_get_all(size_t *count) {
    if (count != NULL) {
        *count = sizeof(CHALLENGES) / sizeof(CHALLENGES[0]);
    }
    return CHALLENGES;
}

int challenges_check_answer(const Challenge *challenge, const char *answer) {
    if (challenge == NULL || answer == NULL) {
        return 0;
    }

    return strstr(answer, challenge->expected_keyword) != NULL;
}