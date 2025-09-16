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

Nuxt Content is a module for Nuxt that provides a simple way to manage content for your application. It allows developers to write their content in Markdown, YAML, CSV or JSON files and then query and display it in their application.

I personally discovered it while working on my website, and honestly, it's an amazing tool. If all your content is managed with `@nuxt/content`, it's super easy to build a unified search like you see on those cool websites callable using `ctrl+k` — every page, article, and word becomes searchable.

# Guide

## Config File

Let's start off by creating the `content.config.ts` file in the root of our `Nuxt` project.
What you may not expect, is that all data we get from our files is statically typed, therefore is safe. But this does not happen without our help.

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

Everything we see here just makes sense - we just assign `objects` or `strings` where needed. When it comes to confusing `.editor({ input: "media" })` – in here you actually define a type of Editor Widget you would get when editing your content via the `Nuxt Studio`, the Visual Editor.

Also, I've seen people even writing types for buttons, so inside of `.yml` files people could use such syntax:

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

As you may already see, your config depends strictly from your components and their implementations.

## Usage

Now each time you start your application, `@nuxt/content` will query every specified file from the `content` directory, and you will be able to easily query this data.

This is how easily you can grab the `index` collection data from `index.yml`, mentioned in the config above:

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
- [Nuxt Content](https://content.nuxt.com/)
