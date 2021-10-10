const groupConfig = {
	// 分组显示，tech路由下为一组
	'/tech/vue/': [
		{
			title: 'Vue 相关',
			path: '/tech/vue/', // 没有路由则不能点击
			collapsable: false, // 可折叠-可选的, 默认值是 true,
			sidebarDepth: 2,    // 默认显示的侧边栏深度-可选的, 默认值是 1
			children: [
				{
					title: '使用Vuepress搭建个人博客',
					path: '/tech/vue/vuepress/', // 没有路由则不能点击
					collapsable: false, // 可选的, 默认值是 true,
					sidebarDepth: 1,    // 可选的, 默认值是 1
					// children: [
					// 	'/tech/vue/vuepress/init', '/tech/vue/vuepress/config', '/tech/vue/vuepress/deploy', '/tech/vue/vuepress/expand'
					// ]
				},
			]
		}
	]
}
exports.groupConfig = groupConfig