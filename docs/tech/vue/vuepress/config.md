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
      { text: '首页', link: '/' },
      { text: '个人介绍', link: '/introduce/' },
      // 有下拉选项的导航
      {
        text: '技术分享',
        link: '/tech/',
        items: [
          { text: 'Vue', link: '/tech/vue/', items: [
            { text: '使用Vuepress搭建个人博客', link: '/tech/vue/vuepress/' }
          ]}
        ]   
      }    
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

## 首页配置（homepage）
默认主题提供了一个首页布局，需要在根级 `README.md` 的 YAML front matter 指定 `home: true`;
``` yaml
---
home: true # 指定该文件为您的首页，改为false则不作为首页
actionText: 个人介绍 → # 首页居中显示的文本
heroImage: /logo.png # 代码中所引用的图片，均以.vuepress/public 为根目录
actionLink: /introduce/
features:
- title: 标签1
  details: 描述一下标签1
- title: 标签2
  details: 描述一下标签2
- title: 标签3
  details: 描述一下标签3
footer: MIT Licensed | Copyright © 2021-present P
---
```
任何 `YAML front matter` 之后额外的内容将会以普通的 markdown 被渲染，并插入到 `features` 的后面。

## 导航栏配置（navbar）
导航栏可以配置，页面标题，logo，搜索框，外部链接，多语言切换，下拉菜单等。这里会列举一下常见的用法：
### 导航栏logo
配置 `config.js` 文件中的 `themeConfig` 项的 `logo` 属性，可以增加导航栏 logo ，logo 文件应该存放在公共文件目录下（`docs/.vuepress/public`）
``` js
themeConfig: {
    logo: '/logo.png', // 当然也可以用子目录 例如 /assets/img/logo.png
  }
```
### 导航栏链接
可以通过 `themeConfig.nav` 增加一些导航栏链接:
``` js
// 导航栏配置
[
  { text: '首页', link: '/' },
  { text: '个人介绍', link: '/introduce/' },
  // 有下拉选项的导航
  {
    text: '技术分享',
    items: [
      { 
        text: 'Vue', 
        link: '/tech/vue/', 
        items: [
          { text: '使用Vuepress搭建个人博客', link: '/tech/vue/vuepress/' }
        ]
      }
    ]   
  },
  // 外部链接
  {
    text: '其他博客首页',
    items: [
      { text: '简书', link: 'https://www.jianshu.com/sign_in' },
      { text: 'CSDN', link: 'https://passport.csdn.net/login?code=mobile' },
      { text: '语雀', link: 'https://www.yuque.com/login' },
      { text: '掘金', link: 'https://juejin.cn/' },
    ]
  }
]
```
另外：
> 外部链接 `<a>` 标签的特性将默认包含target="_blank" rel="noopener noreferrer"，你可以提供 target 与 rel，它们将被作为特性被增加到 `<a>` 标签上。


## 侧边栏配置（sidebar）
可以通过 `themeConfig.sidebar` 增加页面左边区域侧边栏生效:
### 基础配置
包含多个链接的数组作为配置，链接的文字会自动获取，如果想自定义链接文字，则可以使用 `[link, text]` 格式的数组。
``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      '/',
      '/introduce',
      ['/tech/', '技术分享']
    ]
  }
}
```

### 其他配置
#### `sidebarDepth`
默认情况下，侧边栏会自动显示当前页面 `headers` 组成的链接，嵌套显示，可以通过修改 `themeConfig.sidebarDepth` 属性，来改变显示的深度；
- 1：默认值，显示到 `h2` 标题；
- 0：禁用 headers 提取显示；
- 2：显示到 `h3` 标题。

可以使用 `YAML front matter` 在某个页面单独重写：
```md
<!-- init.md -->
---
sidebarDepth: 2
---
```

#### `displayAllHeaders`
是否默认显示所有页面的 `hearders` 到侧边栏，默认只显示当前活动页面的标题；

设置 `themeConfig.displayAllHeaders = true` 来显示所有页面的标题链接
```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    displayAllHeaders: true // 默认值：false
  }
}
```

### 侧边栏分组
使用对象将导航栏分组，可以对重写每个子组的折叠状态以及深度；
``` js
{
	'/introduce/': [
		{
			title: '自我介绍',
			path: '/introduce/',
			sidebarDepth: 2,
			collapsable: false, // 可折叠-可选的, 默认值是 true,
		}
	],
	// 分组显示，tech路由下为一组
	'/tech/': [
		{
			title: '技术分享',
			path: '', // 没有路由则不能点击
			collapsable: false, // 可折叠-可选的, 默认值是 true,
		},
		{
			title: 'Vue 相关',
			path: '/tech/vue/', // 没有路由则不能点击
			collapsable: true, // 可折叠-可选的, 默认值是 true,
			sidebarDepth: 2,    // 默认显示的侧边栏深度-可选的, 默认值是 1
			children: [
				{
					title: '使用Vuepress搭建个人博客',
					path: '/tech/vue/vuepress/', // 没有路由则不能点击
					collapsable: true, // 可选的, 默认值是 true,
					sidebarDepth: 2,    // 可选的, 默认值是 1
					children: [
						'/tech/vue/vuepress/init', '/tech/vue/vuepress/config'
					]
				},
			]
		}
	]
}
```