const { createRouter, createWebHashHistory } = require('vue-router')

const routes = [
	{
		path: '/home',
		name: 'Home',
		component: () => import('../views/Home.vue'),
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
