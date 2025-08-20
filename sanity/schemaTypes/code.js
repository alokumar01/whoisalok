import { defineType } from 'sanity'

export const codeType = defineType({
  name: 'code',
  title: 'Code',
  type: 'object',
  fields: [
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'Bash', value: 'bash' },
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'code',
      title: 'Code',
      type: 'text',
    },
  ],
})
