---
title: "exam/filter: sed() in C"
tags:
  - c
date: 2025-07-06
description: "A simple filter task in C for the exam, focusing on reading from stdin and memory management."
icon: /icons/c_lang.svg
---

If you're heading into `rank 03` at 42, be ready for this — a simple yet tricky filter task that may count for `50%` of your mark. It’s one of the first exercises you’ll face, testing your understanding of reading from `stdin`, handling memory safely, and working strictly with allowed `libc` functions. Prepare well — small mistakes here cost big.

```c
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int main(int argc, char **argv) {
    if (argc != 2) {
        if (write(1, "\n", 1) < 0)
            perror("write");
        return 0;
    }
    char *to_replace = argv[1];
    ssize_t rd;
    size_t buf_size = 1024;
    char *buf = malloc(buf_size);
    if (!buf) {
        perror("malloc");
        return 1;
    }
    /* read all of stdin into a growable buffer */
    size_t total = 0;
    while ((rd = read(0, buf + total, buf_size - total)) > 0) {
        total += rd;
        if (buf_size - total < 1) {
            buf_size *= 2;
            char *new = realloc(buf, buf_size);
            if (!new) {
                free(buf);
                perror("realloc");
                return 1;
            }
            buf = new;
        }
    }
    if (rd < 0) {
        perror("read");
        free(buf);
        return 1;
    }
    /* replace */
    for (size_t i = 0; i < total; i++) {
        if (strchr(to_replace, buf[i]))
            buf[i] = '*';
    }
    /* stdout */
    if (write(1, buf, total) < 0) {
        perror("write");
        free(buf);
        return 1;
    }
    free(buf);
    return 0;
}

```
