# Pluto Template

A minimalist, fast, and accessible blog template built with `Next.js`, `Tailwind CSS`, and `MDX`.

## Features

- **Dark Mode**: Built-in dark mode support.
- **Awesome Markdown Support**: Write your blog posts in Markdown with support for front matter, along with syntax cool highlighting and many themes for code blocks.
- **Config Driven**: Easily customize **all** aspects of your blog through configuration files.
- **SEO Optimized**: Built with SEO best practices in mind.
- **Statically Generated**: Almost everything is statically generated for optimal performance and minimal server load.

## Dependencies Overview

### Markdown Parsing

- `unified` for processing markdown
- `remark-parse` for parsing markdown
- `remark-rehype` for converting markdown to HTML
- `remark-breaks` for converting line breaks to `<br>` tags
- `remark-gfm` for GitHub Flavored Markdown support
- `rehype` for transforming HTML
- `rehype-stringify` for converting HTML to strings
- `rehype-slug` for adding slugs to headings
- `rehype-autolink-headings` for adding links to headings
- `@shikijs/rehype` for syntax highlighting
- `gray-matter` for parsing front matter
- `zod` for static content validation and typization

### Components

- `tailwind-merge` for merging Tailwind CSS classes
- `clsx` for conditional class names
- `class-variance-authority` for managing component variants
- `next-themes` for theme management
- `@radix-ui/react-*` for accessible UI components <br/>
  Components used (1x):
  - `navigation-menu`.

### Animation

- `motion` for animations and transitions

## Roadmap

- [x] Add MDX Support: Callout Blocks, Steps/Timeline etc
- [x] Add Motion Animations
- [ ] Add parsing **Caching** for faster builds and development (medium)
- [ ] Rework `button` component structure (low)
- [x] Articles/Deep Dives responsiveness issue (critical)
- [ ] Cleaner codebase and better documentation (medium)
- [ ] Shared View component for Articles/Deep Dives (medium)
- [ ] Overall Normalization of styles - paddings, margins, font sizes (medium)

## Development

We are utilizing Node.js 22 LTS for this project, along with `pnpm` as our package manager. To set up the development environment, please follow these steps:

1. Install Node.js 22 LTS from the [official Node.js website](https://nodejs.org/) or via a version manager like `nvm`.
2. Install `pnpm` globally by running the following command:
   ```bash
   npm install -g pnpm
   ```
3. Clone the repository to your local machine.
4. Navigate to the project directory and install the dependencies using `pnpm`:
   ```bash
   pnpm install
   ```
5. Start the development server:
   ```bash
    pnpm dev
   ```

## License

The project is licensed under the [MIT License](LICENSE), except for the two directories: `public/*` and `content/*`, which are not included in the license and are strictly prohibited from being used, copied, modified, or distributed in any form without explicit permission from the original author.
