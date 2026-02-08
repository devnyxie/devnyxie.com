# devnyxie.com

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![ESLint](https://img.shields.io/badge/code%20style-eslint-4B32C3?logo=eslint&logoColor=white)
![License](https://img.shields.io/github/license/devnyxie/devnyxie.com)

![Build](https://img.shields.io/github/actions/workflow/status/devnyxie/devnyxie.com/ci.yml?branch=main)



A minimalist, fast, and accessible blog template built with `Next.js`, `Tailwind CSS` and `MDX`.

## Features

- **Awesome Markdown Support**: Write your blog posts in Markdown with support for front matter, along with cool syntax highlighting and themes.
- **Config Driven**: Easily manage **all** content of your blog through configuration files.
- **SEO Optimized**: Built with SEO best practices in mind, almost everything is statically generated for optimal performance and minimal server load.

## Dependencies Overview

### Markdown Parsing

- `unified` for processing markdown
- `remark-parse` for parsing markdown
- `remark-rehype` for converting markdown to HTML
- `remark-breaks` for converting line breaks to `<br>` tags
- `remark-gfm` for GitHub Flavored Markdown support
- `rehype-stringify` for converting HTML to strings
- `rehype-slug` for adding slugs to headings
- `rehype-autolink-headings` for adding links to headings
- `@shikijs/rehype` for syntax highlighting
- `shiki` for syntax highlighting engine
- `next-mdx-remote` for MDX support in Next.js
- `gray-matter` for parsing front matter
- `js-yaml` for YAML parsing
- `zod` for static content validation and typization

### Components & UI

- `tailwind-merge` for merging Tailwind CSS classes
- `clsx` for conditional class names
- `class-variance-authority` for managing component variants
- `next-themes` for theme management
- `@radix-ui/react-slot` for composable component slots
- `@radix-ui/react-navigation-menu` for accessible navigation menus
- `lucide-react` for React icon components
- `@tabler/icons-react` for Tabler icon components

### Animations & Interactions

- `framer-motion` for animations and transitions
- `embla-carousel-react` for carousel components
- `embla-carousel-autoplay` for carousel autoplay functionality
- `react-intersection-observer` for intersection observer hooks

### Development & Data

- `glob` for file pattern matching
- `react-activity-calendar` for GitHub-style activity calendars

## Roadmap

- [ ] Overall Normalization of styles - paddings, margins, font sizes
- [ ] Add **Search** functionality

## Development

We are utilizing Node.js 24 LTS for this project, along with `pnpm` as our package manager. To set up the development environment, please follow these steps:

## License

The project is licensed under the [MIT License](LICENSE), except for the two directories: `public/*` and `content/*`, which are not included in the license and are strictly prohibited from being used, copied, modified, or distributed in any form without explicit permission from the original author.
