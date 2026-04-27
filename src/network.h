#ifndef NETWORK_H
#define NETWORK_H

typedef struct NetworkState {
    int connected;
    char room_code[16];
} NetworkState;

void network_init(NetworkState *state);
int network_join_room(NetworkState *state, const char *room_code);
void network_disconnect(NetworkState *state);

#endif