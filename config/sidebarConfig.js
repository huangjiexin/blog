module.exports = 
{
  '/interface/': [
    ''
  ],
  '/operation/': [
    {
      title: '操作手册',
      path: '', // 没有路由则不能点击
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: []
    },
    {
      title: '新增需求表',   // 必要的
      path: '/operation/one',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 2,    // 可选的, 默认值是 1
      children: []
    },
    {
      title: 'SRM系统简介',   // 必要的
      path: '/operation/two',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 2,    // 可选的, 默认值是 1
      children: []
    },
    {
      title: '配置中心管理',   // 必要的
      path: '/operation/three',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 2,    // 可选的, 默认值是 1
      children: []
    },
    {
      title: 'SRM leads+试用账号开通',   // 必要的
      path: '/operation/four',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 2,    // 可选的, 默认值是 1
      children: []
    },
  ],
  '/FAQ/': [
    ''
  ],
  '/website/': [
    '',     /* /foo/ */
    'one',  /* /foo/one.html */
    'two'   /* /foo/two.html */
  ],
  '/frontend/': [
    {
      title: '使用Vuepress搭建个人博客',   // 必要的
      path: '',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 1,    // 可选的, 默认值是 1
      children: [
        {
          title: '搭建项目',   // 必要的
          path: '/frontend/vuepress/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 0,    // 可选的, 默认值是 1
          children: [
            {
              title: '初始化项目',   // 必要的
              path: '/frontend/vuepress/init',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
              collapsable: true, // 可选的, 默认值是 true,
              sidebarDepth: 0,    // 可选的, 默认值是 1
              children: []
            },
            {
              title: '基本配置',   // 必要的
              path: '/frontend/vuepress/config',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
              collapsable: true, // 可选的, 默认值是 true,
              sidebarDepth: 0,    // 可选的, 默认值是 1
              children: []
            },
          ]
        },
      ]
    },
  ],
  // fallback
  '/': [
    '',        /* / */
    // 'contact', /* /contact.html */
    // 'about'    /* /about.html */
  ]
}
// [
//   {
//     title: '接口文档',   // 必要的
//     path: '/interface/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
//     collapsable: false, // 可选的, 默认值是 true,
//     sidebarDepth: 1,    // 可选的, 默认值是 1
//     children: [
//       '/'
//     ]
//   },
//   {
//     title: '操作手册',   // 必要的
//     path: '/operation/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
//     collapsable: false, // 可选的, 默认值是 true,
//     sidebarDepth: 1,    // 可选的, 默认值是 1
//     children: [
//       '/'
//     ]
//   },
//   {
//     title: 'FAQ',   // 必要的
//     path: '/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
//     collapsable: false, // 可选的, 默认值是 true,
//     sidebarDepth: 1,    // 可选的, 默认值是 1
//     children: [
//       '/'
//     ]
//   },
//   {
//     title: 'RCC核心网址',   // 必要的
//     path: '/website/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
//     collapsable: true, // 可选的, 默认值是 true,
//     sidebarDepth: 2,    // 可选的, 默认值是 1
//     children: [
//       '',     /* /foo/ */
//       'one',  /* /foo/one.html */
//       'two'   /* /foo/two.html */
//     ]
//   },
// ]