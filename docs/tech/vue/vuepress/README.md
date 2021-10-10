---
title:
  使用Vuepress搭建个人博客
categories:
  - 前端
  - Vue
tags:
  - Vuepress
  - Vue
date: 2021-7-11
---
<!-- more -->

## 介绍
Vuepress —— Vue 的全家桶之一，是一个由 Vue 驱动的静态网站生成器，使用 markdown 语法编写文档，可用于快速搭建技术文档网站及个人博客，非常方便。
> 
> 官网地址: [https://vuepress.vuejs.org/zh/](https://vuepress.vuejs.org/zh/)
>
> github: [https://github.com/vuejs/vuepress](https://github.com/vuejs/vuepress)

可以从官网文档入手，或者参考本篇文章学习如何搭建，如有雷同，纯属借鉴。

## 前言
本文主要介绍如何使用 `vuepress` 快速搭建个人博客并且部署到 `GitHub Pages` 进行展示。
<br />


需要用到 `yarn` 或者 `npm` 进行安装，这里用 `yarn` 举例。
::: warning 官方提示
VuePress 需要 Node.js (opens new window)>= 8.6
:::

## 搭建项目
### 创建一个你喜欢的名字作为目录
``` bash
mkdir blog && cd blog
```
### 使用 `yarn` 初始化
``` bash
# 全：--yes 跳过会话，直接通过默认值生成 package.json
yarn init -y
```
顺便在 `package.json` 中添加一些 `scripts`，用于快速启动或者打包项目。
``` json{5-7}
// package.json
{
  "name": "blog",
  // ... 省略若干
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

### 安装 `vuepress`
官方表示不推荐全局安装，于是
``` bash
# --dev
yarn add -D vuepress # npm install -D vuepress
```
### 创建第一篇文档
在根目录下创建 `docs` 文件夹，并且创建 内容为 `# Hello VuePress` 的 `README.md` 文件
``` bash
mkdir docs && echo '# Hello VuePress' > docs/README.md
```
### 启动服务器
``` bash
yarn docs:dev # npm run docs:dev
```
看到成功启动，即可以访问 `localhost:8081` 查看效果了。
``` bash
success [17:19:28] Build fda1a3 finished in 1874 ms ( http://localhost:8081/ )
```
到此为止，一个简单可用的 `vuepress` 项目就已经初始化好了。接下来再对项目进行 **目录结构** 以及一些其他 **基本配置** 进行完善。


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


## 打包发布
这里使用脚本来执行打包发布的操作
``` bash
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
git push -f git@github.com:huangjiexin/blog.git master:gh-pages

cd -
```
执行脚本
` bash ./deploy.sh/ `

## 设置 gitpage
使用免费 gitpage 时，项目必须为 public 权限，private 的项目需要付费使用gitpage；
![设置](/gitpage.png)

`gh-pages` 就是打包文件的分支，用于 gitpages 访问。


## 使用第三方主题
举个例子：[vuepress-theme-reco](http://vuepress-theme-reco.recoluan.com/)

## 资源汇总
[awesome-vuepress](https://github.com/vuepress/awesome-vuepress)