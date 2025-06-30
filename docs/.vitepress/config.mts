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
          { text: '主页', link: '/zh/' },
          {
            text: '关于',
            items: [
              {
                text: '仓库代码',
                link: 'https://github.com/moyuderen/tiny-uploader-sdk'
              },
              {
                text: '版本历史',
                link: 'https://github.com/moyuderen/tiny-uploader-sdk/blob/main/CHANGELOG.md'
              }
            ]
          },
          {
            text: '服务端mock接口',
            link: 'https://moyuderen.github.io/tiny-uploader-server/zh/'
          }
        ],
        sidebar: {
          '/zh/': [
            {
              text: '开始',
              items: [
                { text: '快速上手', link: '/zh/quick-start' },
                { text: '配置', link: '/zh/props' },
                { text: '回调函数', link: '/zh/callbacks' },
                { text: '方法', link: '/zh/functions' }
              ]
            },
            {
              text: '其他',
              collapsed: false,
              items: [
                { text: '实例', link: '/zh/instance' },
                { text: '枚举', link: '/zh/enum' },
                { text: '类型', link: '/zh/interface' }
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
