import { defineCollection, z } from 'astro:content';

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    navLabel: z.string().optional(), // Custom navigation label (defaults to slug if not provided)
    description: z.string().optional(),
    updated: z.date().optional(),
    navOrder: z.number().optional(),
    hideFromNav: z.boolean().optional().default(false), // Hide page from navigation menu
    layout: z.string().optional(), // Optional layout identifier for special page layouts
    draft: z.boolean().optional().default(false),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    emoji: z.string(),
    title: z.string(),
    context: z.string(),
    order: z.number(),
    years: z.string().optional(),
    link: z.string().url().optional(),
  }),
});

const now = defineCollection({
  type: 'content',
  schema: z.object({
    // All fields optional - will be inferred from filename/context
    draft: z.boolean().optional().default(false),
  }),
});

// Future: add posts collection
// const posts = defineCollection({
//   type: 'content',
//   schema: z.object({
//     title: z.string(),
//     description: z.string().optional(),
//     pubDate: z.date(),
//     tags: z.array(z.string()).optional(),
//     draft: z.boolean().optional().default(false),
//   }),
// });

export const collections = {
  pages,
  projects,
  now,
  // posts,
};

