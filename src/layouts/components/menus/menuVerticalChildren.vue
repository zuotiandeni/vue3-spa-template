<template>
	<el-scrollbar ref="verticalMenusRef" class="children-vertical-menus-scrollbar">
		<el-menu
			class="layouts-menu-vertical-children"
			:collapse-transition="false"
			:unique-opened="config.pageConfig.menuUniqueOpened"
			:default-active="state.defaultActive"
			:collapse="config.pageConfig.menuCollapse"
		>
			<MenuTree v-if="state.routeChildren.length > 0" :menus="state.routeChildren" />
		</el-menu>
	</el-scrollbar>
</template>

<script setup>
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import MenuTree from './menuTree.vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { usePageConfig } from '@/stores/pageConfig'
import { useNavTabs } from '@/stores/navTabs'
import { currentRouteTopActivity } from './helper'

const config = usePageConfig()
const navTabs = useNavTabs()
const route = useRoute()

const verticalMenusRef = ref()

const state = reactive({
	defaultActive: '',
	routeChildren: [],
})

const verticalMenusScrollbarHeight = computed(() => {
	let menuTopBarHeight = 0
	if (config.pageConfig.menuShowTopBar) {
		menuTopBarHeight = 50
	}
	if (config.pageConfig.layoutMode == 'Default') {
		return 'calc(100vh - ' + (32 + menuTopBarHeight) + 'px)'
	} else {
		return 'calc(100vh - ' + menuTopBarHeight + 'px)'
	}
})

/**
 * 激活当前路由的菜单
 * @param currentRoute 当前路由
 */
const currentRouteActive = currentRoute => {
	let routeChildren = currentRouteTopActivity(currentRoute.path, navTabs.navState.tabsViewRoutes)
	if (routeChildren) {
		state.defaultActive = currentRoute.path
		if (routeChildren.children && routeChildren.children.length > 0) {
			state.routeChildren = routeChildren.children
		} else {
			state.routeChildren = [routeChildren]
		}
	} else if (!state.routeChildren) {
		state.routeChildren = navTabs.navState.tabsViewRoutes
	}
}

/**
 * 侧栏菜单滚动条滚动到激活菜单所在位置
 */
const verticalMenusScroll = () => {
	nextTick(() => {
		let activeMenu = document.querySelector('.el-menu.layouts-menu-vertical-children li.is-active')
		if (!activeMenu) return false
		verticalMenusRef.value?.setScrollTop(activeMenu.offsetTop)
	})
}

onMounted(() => {
	currentRouteActive(route)
	verticalMenusScroll()
})

onBeforeRouteUpdate(to => {
	currentRouteActive(to)
})
</script>
<style>
.children-vertical-menus-scrollbar {
	height: v-bind(verticalMenusScrollbarHeight);
	background-color: v-bind('config.getColorVal("menuBackground")');
}
.layouts-menu-vertical-children {
	border: 0;
	--el-menu-bg-color: v-bind('config.getColorVal("menuBackground")');
	--el-menu-text-color: v-bind('config.getColorVal("menuColor")');
	--el-menu-active-color: v-bind('config.getColorVal("menuActiveColor")');
}
</style>
