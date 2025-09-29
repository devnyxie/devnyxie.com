# Design System

After much experimentation, I've settled on a design system based on the `Nuxt UI` variables, with some modifications to suit my personal preferences. While having `shadcn` components in here, I don't want to be tied to their design system - it's needlessly complex for my needs.

Thast's we have:

- `theme.css` - <u>the core design</u> system variables, used across the whole app.
- `shadcn.css` - `shadcn` variables tied to <u>the core design</u> system. Purely for easier integration of `shadcn` components.
- `md.css` - content specific styles.
