#include "network.h"

#include <string.h>

void network_init(NetworkState *state) {
    if (state == NULL) {
        return;
    }

    memset(state, 0, sizeof(*state));
}

int network_join_room(NetworkState *state, const char *room_code) {
    if (state == NULL || room_code == NULL || room_code[0] == '\0') {
        return 0;
    }

    strncpy(state->room_code, room_code, sizeof(state->room_code) - 1);
    state->room_code[sizeof(state->room_code) - 1] = '\0';
    state->connected = 1;
    return 1;
}

void network_disconnect(NetworkState *state) {
    if (state == NULL) {
        return;
    }

    memset(state->room_code, 0, sizeof(state->room_code));
    state->connected = 0;
}