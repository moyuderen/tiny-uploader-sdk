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
    socialLinks: [{ icon: 'github', link: 'https://github.com/moyuderen/tiny-uploader-sdk' }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present moyuderen'
    }
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
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
            text: 'Mock server',
            link: 'https://moyuderen.github.io/tiny-uploader-server/en/'
          }
        ],
        sidebar: {
          '/en/': [
            {
              text: 'Guide',
              items: [
                { text: 'Qucick Start', link: '/en/quick-start' },
                { text: 'Props', link: '/en/props' },
                { text: 'Callbacks', link: '/en/callbacks' },
                { text: 'Functions', link: '/en/functions' }
              ]
            },
            {
              text: 'Other',
              collapsed: false,
              items: [
                { text: 'Instance', link: '/en/instance' },
                { text: 'Enum', link: '/en/enum' },
                { text: 'Interface', link: '/en/interface' }
              ]
            },
            {
              text: 'FAQ',
              link: '/en/questions'
            }
          ]
        },
        outline: {
          level: 'deep',
          label: 'On this page'
        }
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh',
      link: '/zh/',
      themeConfig: {
        search: {
          provider: 'local',
          options: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '没有找到结果',
                resetButtonTitle: '重置搜索',
                footer: {
                  selectText: '选择',
                  navigateText: '导航',
                  closeText: '关闭'
                }
              }
            }
          }
        },
        nav: [
          { text: 'Home', link: '/zh/' },
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
            text: 'Mock server',
            link: 'https://moyuderen.github.io/tiny-uploader-server/zh/'
          }
        ],
        sidebar: {
          '/zh/': [
            {
              text: 'Guide',
              items: [
                { text: 'Qucick Start', link: '/zh/quick-start' },
                { text: 'Props', link: '/zh/props' },
                { text: 'Callbacks', link: '/zh/callbacks' },
                { text: 'Functions', link: '/zh/functions' }
              ]
            },
            {
              text: 'Other',
              collapsed: false,
              items: [
                { text: 'Instance', link: '/zh/instance' },
                { text: 'Enum', link: '/zh/enum' },
                { text: 'Interface', link: '/zh/interface' }
              ]
            },
            {
              text: 'FAQ',
              link: '/zh/questions'
            }
          ]
        },
        outline: {
          level: 'deep',
          label: '大纲'
        }
      }
    }
  },
  markdown: {
    lineNumbers: true
  }
})
