import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Translate Tech',
  description: '技术翻译文档',
  
  // 多语言配置
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Translate Tech',
      description: '技术翻译文档',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '指南', link: '/guide/' },
          { text: '翻译规范', link: '/standards/' },
          { text: '工具', link: '/tools/' }
        ],
        sidebar: {
          '/guide/': [
            {
              text: '开始',
              items: [
                { text: '介绍', link: '/guide/' },
                { text: '快速开始', link: '/guide/getting-started' }
              ]
            }
          ],
          '/standards/': [
            {
              text: '翻译规范',
              items: [
                { text: '概述', link: '/standards/' },
                { text: '术语表', link: '/standards/terminology' },
                { text: '风格指南', link: '/standards/style-guide' }
              ]
            }
          ],
          '/tools/': [
            {
              text: '工具',
              items: [
                { text: '概述', link: '/tools/' },
                { text: 'CAT工具', link: '/tools/cat-tools' },
                { text: 'API工具', link: '/tools/api-tools' }
              ]
            }
          ]
        },
        footer: {
          message: '基于 MIT 许可发布',
          copyright: 'Copyright © 2024 Translate Tech'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Translate Tech',
      description: 'Technical Translation Documentation',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Guide', link: '/en/guide/' },
          { text: 'Standards', link: '/en/standards/' },
          { text: 'Tools', link: '/en/tools/' }
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: 'Getting Started',
              items: [
                { text: 'Introduction', link: '/en/guide/' },
                { text: 'Quick Start', link: '/en/guide/getting-started' }
              ]
            }
          ],
          '/en/standards/': [
            {
              text: 'Translation Standards',
              items: [
                { text: 'Overview', link: '/en/standards/' },
                { text: 'Terminology', link: '/en/standards/terminology' },
                { text: 'Style Guide', link: '/en/standards/style-guide' }
              ]
            }
          ],
          '/en/tools/': [
            {
              text: 'Tools',
              items: [
                { text: 'Overview', link: '/en/tools/' },
                { text: 'CAT Tools', link: '/en/tools/cat-tools' },
                { text: 'API Tools', link: '/en/tools/api-tools' }
              ]
            }
          ]
        },
        footer: {
          message: 'Released under the MIT License',
          copyright: 'Copyright © 2024 Translate Tech'
        }
      }
    }
  },
  
  themeConfig: {
    logo: '/logo.svg',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/translate-tech' }
    ],
    search: {
      provider: 'local'
    }
  }
})