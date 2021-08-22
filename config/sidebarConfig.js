const simpleConfig = 
[
	'/',
	'/introduce/',
	['/tech/', '技术分享'] // [link, text]
]

const multConfig = {
	'/introduce/': [
		''
	],
	'/tech/': [
		'',
		'/tech/vue/'
	]
}

const groupConfig = {
	'/introduce/': [
		{
			title: '自我介绍',
			path: '/introduce/', // 没有路由则不能点击
			sidebarDepth: 2,
			collapsable: false, // 可折叠-可选的, 默认值是 true,
		}
	],
	// 分组显示，tech路由下为一组
	'/tech/': [
		{
			title: '技术分享',
			path: '/tech/', // 没有路由则不能点击
			collapsable: false, // 可折叠-可选的, 默认值是 true,
			sidebarDepth: 0,    // 默认显示的侧边栏深度-可选的, 默认值是 1
		},
		{
			title: 'Vue 相关',
			path: '/tech/vue/', // 没有路由则不能点击
			collapsable: true, // 可折叠-可选的, 默认值是 true,
			sidebarDepth: 2,    // 默认显示的侧边栏深度-可选的, 默认值是 1
			children: [
				{
					title: '一、使用Vuepress搭建个人博客',
					path: '/tech/vue/vuepress/', // 没有路由则不能点击
					collapsable: false, // 可选的, 默认值是 true,
					sidebarDepth: 2,    // 可选的, 默认值是 1
					children: [
						'/tech/vue/vuepress/init', '/tech/vue/vuepress/config', '/tech/vue/vuepress/deploy'
					]
				},
			]
		}
	]
}
exports.simpleConfig = simpleConfig
exports.multConfig = multConfig
exports.groupConfig = groupConfig