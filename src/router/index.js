import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { staticRoutes } from './static'

const router = createRouter({
	history: createWebHashHistory(),
	routes: staticRoutes,
})

// 全局前置守卫：在导航开始前触发
router.beforeEach((to, from, next) => {
	NProgress.configure({ showSpinner: false })
	NProgress.start()

	next()
})

// 全局后置守卫：在导航完成后触发
router.afterEach(() => {
	NProgress.done()
})

export default router
