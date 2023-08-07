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
					menu_type: 'tab', // 可选值：tab、iframe、link
					icon: 'ElIconHomeFilled',
					keepalive: 'controlPanel', // 值为当前路由name
				},
			},
			{
				// 首页
				path: '/productCenter',
				name: 'productCenter',
				meta: {
					title: '产品中心',
					addtab: true, // true表示可以被添加进tab中
					type: 'menu', // 可选值：menu，menu-dir
					menu_type: 'tab',
					icon: 'ElIconHomeFilled',
					keepalive: 0,
				},
				children: [
					{
						// 新建产品
						path: '/productCenter/addProduct',
						name: 'productCenter/addProduct',
						component: () => import('@/views/productCenter/addProduct.vue'),
						meta: {
							title: '新建产品',
							addtab: true, // true表示可以被添加进tab中
							type: 'menu', // 可选值：menu，menu-
							menu_type: 'tab',
							icon: 'ElIconHomeFilled',
							keepalive: 'productCenter/addProduct',
							children: [],
						},
					},
					{
						// 新建产品
						path: '/productCenter/productOverview',
						name: 'productCenter/productOverview',
						component: () => import('@/views/productCenter/productOverview.vue'),
						meta: {
							title: '产品概览',
							addtab: true, // true表示可以被添加进tab中
							type: 'menu', // 可选值：menu，menu-
							menu_type: 'tab',
							icon: 'ElIconHomeFilled',
							keepalive: 'productCenter/productOverview',
							children: [],
						},
					},
				],
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
		path: '/:path(.*)*',
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
