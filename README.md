# devnyxie.com

## Setup

```bash
# native (dev)
yarn dev
# native (build & host)
yarn build
yarn start

# Docker
docker build -t devnyxie.com .
docker run -d --name devnyxie.com --restart always -p 3000:3000 devnyxie.com

# Docker Compose
docker compose up -d
```

## To Do List

- [ ] Restructure CSS variables, add more variables: `ring-focus`, `bg-card`, `muted`
      List of variables:
      Background: `background`, `background-secondary`, `background-card`
      Foreground: `foreground`, `foreground-secondary`, `foreground-secondary-hover`, `foreground-muted`
      Border: `outline`
- [ ] Parse markdown files instead of using JSON
- [ ] Add a search feature
- [ ] Add a dark mode toggle

### Notes

- The `cn` function is used to conditionally join class names.
- Utilizing `shadcn/ui` for UI components is useless, each component can be easily built with Tailwind CSS - let's keep it simple & clean!
