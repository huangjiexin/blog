# 部署项目
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
