import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/tiny-uploader-sdk/',
  title: '@tinyuploader/sdk',
  description: '',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },

    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'About',
        items: [
          {
            text: 'Repository',
            link: 'https://github.com/moyuderen/tiny-uploader-sdk'
          },
          {
            text: 'Changelog',
            link: 'https://github.com/moyuderen/tiny-uploader-sdk/blob/main/CHANGELOG.md'
          }
        ]
      },
      {
        text: 'Server',
        items: [
          {
            text: 'Server useage',
            link: 'https://moyuderen.github.io/tiny-uploader-server/'
          },
        ]
      },
    ],

    sidebar: {
      '/sdk/': [
        {
          text: 'Guide',
          items: [
            { text: '开始', link: '/sdk/quick-start' },
            { text: '参数配置', link: '/sdk/props' },
            { text: '回调', link: '/sdk/callbacks' },
            { text: '方法', link: '/sdk/functions' }
          ]
        },
        {
          text: 'Other',
          collapsed: false,
          items: [
            { text: '实例', link: '/sdk/instance' },
            { text: '枚举', link: '/sdk/enum' },
            { text: 'interface', link: '/sdk/interface' }
          ]
        },
        {
          text: 'FAQ',
          link: '/sdk/questions'
        }
      ],
      '/vue/': []
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/moyuderen/uploader' }],
    outline: {
      level: 'deep',
      label: 'On this page'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present moyuderen'
    }
  },
  markdown: {
    lineNumbers: true
  }
})
