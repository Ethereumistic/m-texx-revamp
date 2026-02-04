import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'partners',
    title: 'Partners',
    type: 'document',
    fields: [
        defineField({
            name: 'partnerList',
            title: 'Partner List',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'partner',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Name',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'region',
                            title: 'Region',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'North', value: 'north' },
                                    { title: 'South', value: 'south' },
                                    { title: 'East', value: 'east' },
                                    { title: 'West', value: 'west' },
                                    { title: 'Central', value: 'central' },
                                ],
                            },
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'logo',
                            title: 'Logo (Upload)',
                            type: 'image',
                            options: {
                                hotspot: true,
                            },
                        }),
                        defineField({
                            name: 'logoUrl',
                            title: 'Logo CDN URL',
                            type: 'url',
                            description: 'Paste a CDN link here if you don\'t want to upload an image.',
                        }),
                        defineField({
                            name: 'invert',
                            title: 'Invert in Dark Mode',
                            type: 'boolean',
                            initialValue: false,
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            media: 'logo',
                            subtitle: 'region',
                        },
                    },
                },
            ],
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Partners List',
            }
        },
    },
})
