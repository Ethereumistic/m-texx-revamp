import { defineField, defineType } from 'sanity'

/**
 * SEO-Enhanced Post Schema
 * Adds critical SEO fields for maximum Google visibility
 */
export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'settings', title: 'Settings' }
  ],
  fields: [
    // CONTENT FIELDS
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(60).warning('Keep under 60 chars for best SEO'),
      group: 'content'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) => input
          .toLowerCase()
          // Handle Bulgarian Cyrillic to Latin transliteration
          .replace(/а/g, 'a').replace(/б/g, 'b').replace(/в/g, 'v')
          .replace(/г/g, 'g').replace(/д/g, 'd').replace(/е/g, 'e')
          .replace(/ж/g, 'zh').replace(/з/g, 'z').replace(/и/g, 'i')
          .replace(/й/g, 'y').replace(/к/g, 'k').replace(/л/g, 'l')
          .replace(/м/g, 'm').replace(/н/g, 'n').replace(/о/g, 'o')
          .replace(/п/g, 'p').replace(/р/g, 'r').replace(/с/g, 's')
          .replace(/т/g, 't').replace(/у/g, 'u').replace(/ф/g, 'f')
          .replace(/х/g, 'h').replace(/ц/g, 'ts').replace(/ч/g, 'ch')
          .replace(/ш/g, 'sh').replace(/щ/g, 'sht').replace(/ъ/g, 'a')
          .replace(/ь/g, 'y').replace(/ю/g, 'yu').replace(/я/g, 'ya')
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/--+/g, '-')
          .trim()
      },
      validation: (Rule) => Rule.required(),
      group: 'content'
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
      validation: (Rule) => Rule.required(),
      group: 'content'
    }),
    defineField({
      name: 'mainImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text (SEO Critical)',
          description: 'Describe the image for screen readers and Google. Include target keyword if relevant.',
          validation: (Rule) => Rule.required().min(10).max(125)
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption (Optional)'
        }
      ],
      validation: (Rule) => Rule.required(),
      group: 'content'
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
      validation: (Rule) => Rule.required().min(1).max(3),
      group: 'content'
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
      group: 'content'
    }),

    // SEO FIELDS
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (Override)',
      type: 'string',
      description: 'Leave blank to use main title. Use this to optimize for keywords.',
      validation: (Rule) => Rule.max(60),
      group: 'seo'
    }),
    defineField({
      name: 'focusKeyword',
      title: 'Focus Keyword',
      type: 'string',
      description: 'Primary keyword you want to rank for (e.g., "текстилно рециклиране софия")',
      placeholder: 'текстилно рециклиране',
      group: 'seo'
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Additional keywords for this post (5-10 recommended)',
      options: {
        layout: 'tags'
      },
      group: 'seo'
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Meta Description',
      type: 'text',
      rows: 3,
      description: 'This appears in Google search results. Include primary keyword naturally.',
      validation: (Rule) =>
        Rule.required()
          .min(120)
          .max(160)
          .warning('Optimal length: 120-160 characters for Google'),
      group: 'seo'
    }),
    defineField({
      name: 'faqs',
      title: 'FAQ Section (for Rich Snippets)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faq',
          fields: [
            {
              name: 'question',
              type: 'string',
              title: 'Question',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'answer',
              type: 'text',
              title: 'Answer',
              rows: 3,
              validation: (Rule) => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer'
            }
          }
        }
      ],
      description: 'Add FAQs to get featured snippets in Google',
      group: 'seo'
    }),

    // SETTINGS
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      group: 'settings'
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      publishedAt: 'publishedAt',
    },
    prepare({ title, author, media, publishedAt }) {
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString('bg-BG') : 'Draft'
      return {
        title: title,
        subtitle: `${author || 'No author'} | ${date}`,
        media: media
      }
    },
  },
})

