# Pluto Template

A minimalist, fast, and accessible blog template built with `Next.js`, `Tailwind CSS`, and `MDX`.

## Dependencies

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
