<template>
	<div class="layouts-menu-horizontal">
		<div class="menu-horizontal-logo" v-if="config.pageConfig.menuShowTopBar">
			<Logo />
		</div>
		<el-scrollbar ref="horizontalMenusRef" class="horizontal-menus-scrollbar">
			<el-menu
				class="menu-horizontal"
				mode="horizontal"
				:default-active="state.defaultActive"
				:key="state.menuKey"
			>
				<MenuTree :menus="menus" />
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script setup>
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import Logo from '../logo.vue'
import MenuTree from './menuTree.vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { usePageConfig } from '@/stores/pageConfig'
import { useNavTabs } from '@/stores/navTabs'
import { uuid } from '@/utils/random'

const horizontalMenusRef = ref()

const config = usePageConfig()
const navTabs = useNavTabs()
const route = useRoute()

const state = reactive({
	menuKey: uuid(),
	defaultActive: '',
})

const menus = computed(() => {
	state.menuKey = uuid()
	return navTabs.navState.tabsViewRoutes
})

// 激活当前路由的菜单
const currentRouteActive = currentRoute => {
	state.defaultActive = currentRoute.path
}

// 滚动条滚动到激活菜单所在位置
const verticalMenusScroll = () => {
	nextTick(() => {
		let activeMenu = document.querySelector('.el-menu.menu-horizontal li.is-active')
		if (!activeMenu) return false
		horizontalMenusRef.value?.setScrollTop(activeMenu.offsetTop)
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

<style scoped lang="scss">
.layouts-menu-horizontal {
	display: flex;
	align-items: center;
	width: 100vw;
	height: 60px;
	background-color: var(--wti-bg-color-overlay);
	border-bottom: solid 1px var(--el-color-info-light-8);
}
.menu-horizontal-logo {
	width: 180px;
	&:hover {
		background-color: v-bind('config.getColorVal("headerBarHoverBackground")');
	}
}
.horizontal-menus-scrollbar {
	flex: 1;
}
.menu-horizontal {
	border: none;
	--el-menu-bg-color: v-bind('config.getColorVal("menuBackground")');
	--el-menu-text-color: v-bind('config.getColorVal("menuColor")');
	--el-menu-active-color: v-bind('config.getColorVal("menuActiveColor")');
}

.el-sub-menu .icon,
.el-menu-item .icon {
	vertical-align: middle;
	margin-right: 5px;
	width: 24px;
	text-align: center;
	flex-shrink: 0;
}
.is-active .icon {
	color: var(--el-menu-active-color) !important;
}
.el-menu-item.is-active {
	background-color: v-bind('config.getColorVal("menuActiveBackground")');
}
</style>
