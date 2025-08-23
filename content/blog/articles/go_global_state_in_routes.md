---
title: Go Global State in Routes
date: 2025-08-08
tags:
  - go
  - api
image: https://media2.dev.to/dynamic/image/width=1600,height=900,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fz7i5q6n15xf31byhvjnk.png
icon: /icons/go_lang.png
description: Learn how to share global state in Go routes using middleware, context, and interfaces.
---

In one point or another, we all come up to this issue - how to share certain props between all routes? It may be a token, client instance or some other shared data with a mutex.

Let's say we have a basic route in `routes` package:

```go
// test.go
func HandlerData(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello from data route!")
}
```

Let's say this is the structure we want to share among all routes – `App` structure in package `types`, holding `GitHub` and `Redis` clients inside.

```go
// app.go
package types

import (
	"github.com/google/go-github/github"
	"github.com/redis/go-redis/v9"
)

type App struct {
	GithubClient *github.Client
	RedisClient *redis.Client
}
```

Then, we can initialize the `App` instance along with the clients at the start of out application. Once it's done, all routes should be able to access it.
Here are some ways we can achieve this:

## Struct-Based Handlers

```go
// main.go
type App struct {
	// ...
}

func (a *App) HandlerData(w http.ResponseWriter, r *http.Request) {
  // ...
}

func main() {
  // ...
  http.HandleFunc("/data", app.HandlerData)
  log.Fatal(http.ListenAndServe(":8080", nil))
}
```

> [!warning]
> The problem with this approach is that the struct should be declared in the same package as the struct based handler is in; therefore we can't define `App` struct in the `main` or `types` package.

## Middleware + Context

Wrap your handlers in middleware that injects shared data into the `context.Context` of each request; then you can pull them out in your route handler.

This one is gonna a little bit different.

```go
//main.go
func main() {
	app := &App{
		// ...
	}
	mux := http.NewServeMux()
	mux.HandleFunc("/data", app.WithClients(HandlerData()))
	http.ListenAndServe(":8080", mux)
}
```

```go
// app.go
type App struct {
	GithubClient   *github.Client
	RedisClient    *redis.Client
}

type contextKey string

const (
	githubClientKey contextKey = "GithubClient"
	redisClientKey  contextKey = "RedisClient"
)

func (app *App) WithClients(next http.Handler) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := context.WithValue(r.Context(), githubClientKey, app.GithubClient)
		ctx = context.WithValue(ctx, redisClientKey, app.RedisClient)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
```

```go
// data_handler.go
func HandlerData() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		GithubClient := r.Context().Value(types.GithubClientKey).(*github.Client)

		// fetch random data using GitHub client
		options := &github.ListOptions{Page: 0, PerPage: 10}
		result, _, _ := GithubClient.Activity.ListEventsPerformedByUser(context.Background(), "devnyxie", true, options)
		jsonData, _ := json.Marshal(result)

		w.WriteHeader(http.StatusOK)
		w.Write([]byte(jsonData))
	}
}

```

## Interface-Based

My favourite one so far. Interfaces in Go are clean, in a meaning that you can pass `*App` but expect `Services` type. In some routes you can use `*App`, in some – `Services` for `GitHub` or `Redis` client access.

```go
// app.go
type Services interface {
    Github() *github.Client
    Redis() *redis.Client
}

func (app *App) Github() *github.Client { return app.GithubClient }
func (app *App) Redis() *redis.Client { return app.RedisClient }
```

```go
//routes.go
func HandlerData(services Services) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        client := services.Github()
        // ...
    }
}
```

```go
//main.go
func main() {
	// ...
	mux := http.NewServeMux()
	mux.HandleFunc("/data", HandlerData(app))

	http.ListenAndServe(":8080", mux)

}
```

As you can see, this is the cleanest solution so far for our application. Clients get isolated from the `App` config itself by adding them to the `Services` struct.

## Struct Embedding (Clean but Opinionated)

Found this one online. Seems to be a very clean solution, but also a hard to read one.

```go
// In types/handler.go
type Handler struct {
    *App
}

func (h *Handler) UserEvents(w http.ResponseWriter, r *http.Request) {
    // Direct access to h.GithubClient, h.RedisClient
}

func (h *Handler) Test(w http.ResponseWriter, r *http.Request) {
    // Direct access to clients
}

// In routes.go
func SetupRoutes(mux *http.ServeMux, app *types.App) {
    h := &Handler{App: app}
    mux.HandleFunc("/user-events", h.UserEvents)
    mux.HandleFunc("/test", h.Test)
}
```
