import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { cloneDeep, isEmpty } from 'lodash'

import { STORE_TAB_VIEW_CONFIG } from './constant/cacheKey'

/**
 * 对iframe的url进行编码
 */
function encodeRoutesURI(data) {
	data.forEach(item => {
		if (item.meta?.menu_type === 'iframe') {
			item.path = `/admin/iframe/${encodeURIComponent(item.path)}`
		}

		if (item.children && item.children.length) {
			item.children = encodeRoutesURI(item.children)
		}
	})
	return data
}

export const useNavTabs = defineStore(
	'navTabs',
	() => {
		const navState = reactive({
			// 激活tab的index
			activeIndex: 0,
			// 当前激活的tab
			activeRoute: null,
			// tab列表
			tabsView: [],
			// 从后台加载到的菜单路由列表
			tabsViewRoutes: [],
		})

		// 添加tab
		function addTab(tabRoute) {
			const route = cloneDeep(tabRoute)
			// 当前点击的菜单是否允许加入到tabs列表中？
			if (!route.meta.addtab) return
			const tabItem = navState.tabsView.find(item => {
				return item.path === route.path
			})
			if (tabItem) {
				tabItem.params = !isEmpty(route.params) ? route.params : tabItem.params
				tabItem.query = !isEmpty(route.query) ? route.query : tabItem.query
			} else {
				navState.tabsView.push(route)
			}
		}

		// 关闭tab
		function closeTab(index) {
			// const navItemIndex = navState.tabsView.findIndex(item => {
			// 	return item.path === route.path
			// })
			navState.tabsView.splice(index, 1)
		}

		function setTabsViewRoutes(data) {
			navState.tabsViewRoutes = encodeRoutesURI(data)
		}

		// 设置当前选中的tab
		const setActiveRoute = tabRoute => {
			const route = cloneDeep(tabRoute)
			const currentRouteIndex = navState.tabsView.findIndex(item => {
				return item.path === route.path
			})
			if (currentRouteIndex === -1) return
			navState.activeRoute = route
			navState.activeIndex = currentRouteIndex
		}

		return { navState, addTab, closeTab, setActiveRoute, setTabsViewRoutes }
	},
	{
		persist: {
			// 页面配置相关的信息就存在localstorage中就可以了
			// storage: sessionStorage, // 默认被存储在localstorage中
			key: STORE_TAB_VIEW_CONFIG,
		},
	},
)
