# 基本配置
这里主要介绍 `vuepress` 项目的基础目录结构，以及一些常用的配置，例如导航栏、侧边栏。

## 目录结构
官方没有现成的 cli 创建目录结构，遵循 “**约定优于配置**” 的原则，如不必要，尽量保持同样的基础的目录结构；

手动创建以下的目录结构：
``` bash
blog
├─package.json
├─docs
|  ├─README.md
|  ├─.vuepress
|  |  ├─config.js
|  |  ├─public
|  |  |  └avatar.png
|  |  |  └logo.png
```
- `docs`: 展示用的md文件都放在docs目录下
- `docs/.vuepress`: 用于存放全局的配置、组件、静态资源等。
- `docs/.vuepress/config.js`: 配置文件的入口文件
- `docs/.vuepress/public`: 静态资源根目录，所有静态资源均放这里。

更多的目录结构，如样式重写，自定义主题，客户端加强等功能，请参考[官方文档](https://vuepress.vuejs.org/zh/guide/directory-structure.html#%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84)。

### 默认的页面路由
`docs` 目录作为所有文件的**相对根路径**。
因此，默认页面路由地址如下：
| 文件相对路径 | 路由地址 |
| ---- | ---- |
| `/docs/readme.md` | `/` |

## 配置文件 
`config.js` 是 VuePress项目 必要的配置文件，几乎所有配置项都是在这里配置；
导出为一个 JavaScript 对象，这里列举一些常用的配置项：
``` js
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
    // logo: '/avatar.png',  // 左上角logo
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
```
想了解更多的配置，请详细阅读官方文档 —— [配置](https://vuepress.vuejs.org/zh/config/)

## 主题配置
这里使用的是 VuePress 默认主题，想了解自定义主题，可以参考 [自定义主题](https://vuepress.vuejs.org/zh/theme/)。

### 导航栏配置（navbar）
导航栏可以配置，页面标题，logo，搜索框，外部链接，多语言切换，下拉菜单等。这里会列举一下常见的用法：
#### 导航栏logo
配置 `config.js` 文件中的 `themeConfig` 项的 `logo` 属性，可以增加导航栏 logo ，logo 文件应该存放在公共文件目录下（`docs/.vuepress/public`）
``` js
themeConfig: {
    logo: '/logo.png', // 当然也可以用子目录 例如 /assets/img/logo.png
  }
```
#### 导航栏链接
可以通过 `themeConfig.nav` 增加一些导航栏链接:
``` js
  // 内部路由
  { text: '操作手册', link: '/operation/' },
  // 外部链接
  { text: '产品介绍', link: 'https://www.iccchina.com/home/srm_info' },
  // 有下拉选项的导航
  {
    text: '前端总结',
    items: [
        { text: '使用Vuepress搭建个人博客', link: '/frontend/vuepress/' }
    ]   
  }
```
另外：
> 外部链接 `<a>` 标签的特性将默认包含target="_blank" rel="noopener noreferrer"，你可以提供 target 与 rel，它们将被作为特性被增加到 `<a>` 标签上。


### 侧边栏配置（sidebar）

### 首页配置（homepage）