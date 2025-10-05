---
title: "Nuxt Content: The git-based CMS"
description: Review of Nuxt Content, the git-based CMS for Nuxt projects.
date: 2025-07-06
icon: https://nuxt.com/assets/design-kit/icon-green.svg
tags:
  - nuxt
  - frontend
---

# @nuxt/content

Nuxt Content is a powerful module for Nuxt that provides an elegant way to manage content for your application. It enables developers to write content in Markdown, YAML, CSV, or JSON files and seamlessly query and display it in their application.

I personally discovered it while working on my website, and honestly, it's an amazing tool. If all your content is managed with `@nuxt/content`, it's super easy to build that unified search feature you see on those cool websites (the one you can trigger with `ctrl+k`) — every page, article, and word becomes instantly searchable.

# Guide

## Config File

Let's start by creating the `content.config.ts` file in the root of our `Nuxt` project.
What you might not expect is that all data we get from our files is statically typed, making it type-safe. However, this doesn't happen automatically - we need to set things up correctly.

```ts
const createImageSchema = () =>
  z.object({
    src: z.string().editor({ input: "media" }),
    alt: z.string(),
  });

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: "page",
      source: "index.yml",
      schema: z.object({
        hero: z.object({
          links: z.string(),
          images: z.array(createImageSchema()),
        }),
        about: createBaseSchema(),
        experience: createBaseSchema().extend({
          items: z.array(
            z.object({
              date: z.date(),
              position: z.string(),
              company: z.object({
                name: z.string(),
                url: z.string(),
                logo: z.string().editor({ input: "icon" }),
                color: z.string(),
              }),
            })
          ),
        }),
      }),
    }),
  },
});
```

The code above follows a logical structure - we're simply assigning `objects` or `strings` as needed for our schema. When you see the perhaps puzzling `.editor({ input: "media" })` syntax – this actually defines the type of Editor Widget you'll get when editing your content through `Nuxt Studio`, the Visual Editor for Nuxt Content.

I've also seen developers creating types for UI elements like buttons, which allows for clean, structured syntax in `.yml` files:

```yml
hero:
  links:
    - label: "More"
      to: https://example.com/more
      color: "neutral"
```

Here is an example:

```ts
const createButtonSchema = () =>
  z.object({
    label: z.string(),
    icon: z.string().optional(),
    to: z.string().optional(),
    color: z
      .enum(["primary", "neutral", "success", "warning", "error", "info"])
      .optional(),
    size: z.enum(["xs", "sm", "md", "lg", "xl"]).optional(),
    variant: z
      .enum(["solid", "outline", "subtle", "soft", "ghost", "link"])
      .optional(),
    target: z.enum(["_blank", "_self"]).optional(),
  });

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: "page",
      source: "index.yml",
      schema: z.object({
        hero: z.object({
          links: z.array(createButtonSchema()),
          // ...
```

> [!hint]
> Here the `color`, `size`, `variant` etc. are optional because your code or components are expected to use a **default** if no specific value was passed.

The same process applies to your blog, articles, notes, whatever:

```ts
const createAuthorSchema = () =>
  z.object({
    name: z.string(),
    description: z.string().optional(),
    username: z.string().optional(),
    twitter: z.string().optional(),
    to: z.string().optional(),
    avatar: createImageSchema().optional(),
  });

// ...
blog: defineCollection({
  type: "page",
  source: "blog/*.md",
  schema: z.object({
	minRead: z.number(),
	date: z.date(),
	image: z.string().nonempty().editor({ input: "media" }),
	author: createAuthorSchema(),
  }),
}),
// ...
```

As you can see, your configuration is tightly coupled with your components and their implementations, creating a cohesive type system throughout your application.

## Usage

Every time you start your application, `@nuxt/content` automatically queries all specified files from the `content` directory, making this data readily available throughout your application.

Here's how effortlessly you can retrieve the `index` collection data from the `index.yml` file mentioned in our earlier configuration:

```vue
<template>
  <div v-if="page">
    <LandingHero :page />
  </div>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData("index", () => {
  return queryCollection("index").first();
});

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

useSeoMeta({
  title: page.value?.seo.title || page.value?.title,
  ogTitle: page.value?.seo.title || page.value?.title,
  description: page.value?.seo.description || page.value?.description,
  ogDescription: page.value?.seo.description || page.value?.description,
});
</script>
```

# Sources

- Code Examples - [Nuxt Content Portfolio Template](https://github.com/nuxt-ui-pro/portfolio)
- Official Documentation - [Nuxt Content](https://content.nuxt.com/)
- My personal experience implementing Nuxt Content in production applications
