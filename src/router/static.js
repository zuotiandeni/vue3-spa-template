const staticRoutes = [
	{
		// 首页
		path: '/',
		name: '/',
		component: () => import('@/layouts/index.vue'),
		meta: {
			title: '首页',
			addtab: false, // true表示可以被添加进tab中
			type: 'menu', // 可选值：menu，menu-
			menu_type: 'tab',
			icon: 'ElIconHomeFilled',
		},
		redirect: '/controlPanel',
		children: [
			{
				// 首页
				path: '/controlPanel',
				name: 'controlPanel',
				component: () => import('@/views/index.vue'),
				meta: {
					title: '控制台',
					addtab: true, // true表示可以被添加进tab中
					type: 'menu', // 可选值：menu，menu-
					menu_type: 'tab',
					icon: 'ElIconHomeFilled',
				},
			},
			{
				// 首页
				path: '/productCenter',
				name: 'productCenter',
				component: () => import('@/views/productCenter.vue'),
				meta: {
					title: '产品中心',
					addtab: true, // true表示可以被添加进tab中
					type: 'menu', // 可选值：menu，menu-
					menu_type: 'tab',
					icon: 'ElIconHomeFilled',
				},
			},
		],
	},

	// {
	// 	path: '/:path(.*)*',
	// 	redirect: '/404',
	// },
	// {
	// 	// 404
	// 	path: '/404',
	// 	name: 'notFound',
	// 	component: () => import('/@/views/common/error/404.vue'),
	// 	meta: {
	// 		title: pageTitle('notFound'), // 页面不存在
	// 	},
	// },
	{
		// 后台找不到页面了-可能是路由未加载上
		path: '/admin:path(.*)*',
		meta: {},
		redirect: to => {
			return {
				name: '/',
				params: {
					to: JSON.stringify({
						path: to.path,
						query: to.query,
					}),
				},
			}
		},
	},
	// {
	// 	// 无权限访问
	// 	path: '/401',
	// 	name: 'noPower',
	// 	component: () => import('/@/views/common/error/401.vue'),
	// 	meta: {
	// 		title: pageTitle('noPower'),
	// 	},
	// },
]

export { staticRoutes }
