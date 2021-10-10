
const sidebarConfig = require('../../config/sidebarConfig.js')
const blogConfig = require('../../config/blogConfig.js')

module.exports = {
  title: '林中小栈',
  description: '积硅步，至千里',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/favicon.svg' }], // 增加一个自定义的 favicon(网页标签的图标)
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  base: '/blog/',
  serviceWorker: true, // 是否开启 PWA，自适应移动端样式
  theme: 'reco',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  // 主题样式配置
  themeConfig: {
    type: 'blog',
    blogConfig: blogConfig,
    logo: '/favicon.svg',  // 左上角logo
    lastUpdated: 'Last Updated', //最后更新时间，需要git的commit信息
    // author
    author: 'huangjiexin',
    authorAvatar: '/avatar.jpg',
    nav: [
      { text: '首页', link: '/' },
      { text: '时间轴', link: '/timeline/', icon: 'reco-date' }
    ],
    subSidebar: 'auto',
    sidebar: sidebarConfig.groupConfig
  },
  // 使用插件拓展
  plugins: [
    ['vuepress-plugin-tags', {
      type: 'default', // 标签预定义样式
      color: '#42b983',  // 标签字体颜色
      border: '1px solid #e2faef', // 标签边框颜色
      backgroundColor: '#f0faf5', // 标签背景颜色
      selector: '.page .content__default h1' // ^v1.0.1 你要将此标签渲染挂载到哪个元素后面？默认是第一个 H1 标签后面；可以提供 `document.querySelectorAll()` 支持的选择语法，将标签挂载该元素后面
    }]
  ]
};