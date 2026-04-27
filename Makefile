CC = gcc
CFLAGS = -Wall -Wextra -Werror -std=c11 -Isrc
LDFLAGS =
TARGET = web-learning-game
SRC = $(wildcard src/*.c)
OBJ = $(SRC:.c=.o)

all: $(TARGET)

$(TARGET): $(OBJ)
	$(CC) $(OBJ) -o $@ $(LDFLAGS)

src/%.o: src/%.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	-del /Q src\*.o $(TARGET).exe 2>nul || exit 0

.PHONY: all clean