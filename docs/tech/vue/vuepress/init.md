---
tags: 
  - vue
  - vuepress
---
# 初始化项目
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