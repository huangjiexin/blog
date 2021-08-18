module.exports = [
  { text: '接口文档', link: '/interface/' },
  { text: '操作手册', link: '/operation/' },
  { text: 'SRM产品介绍', link: 'https://www.iccchina.com/home/srm_info' }, // 外部链接
  { text: 'FAQ', link: '/' },
   // 有下拉选项的导航
   {
    text: 'RCC核心网址',
    items: [
        { text: 'One', link: '/website/one' },
        { text: 'Two', link: '/website/two' }
    ]   
  },// 有下拉选项的导航
  {
    text: '前端总结',
    items: [
        { text: '使用Vuepress搭建个人博客', link: '/frontend/vuepress/' }
    ]   
  }
]