module.exports = {
  title: '个人博客',
  description: '个人技术博客',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    // ['link', { rel: 'icon', href: '/avatar.png' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/', // 如果你想将你的网站部署到 https://foo.github.io/bar/，那么 base 应该被设置成 "/bar/"，它的值应当总是以斜杠开始，并以斜杠结束
  serviceWorker: true, // 是否开启 PWA，自适应移动端样式
  // 主题样式配置
  themeConfig: {
    logo: '/logo.png',  // 左上角logo
    // lastUpdated: 'Last Updated', //最后更新时间，需要git的commit信息
    // sidebarDepth: 2, // 将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    nav:[ // 导航栏配置
      {text: '首页', link: '/' },
      {text: '技术文档', link: '/tech/interview/' },
      {text: '简书主页', link: 'https://www.jianshu.com/u/c455567c7f50'}      
    ],
    sidebar: 'auto', // 侧边栏配置
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