<template>
	<el-aside :class="'layout-aside-' + config.pageConfig.layoutMode">
		<Logo v-if="config.pageConfig.menuShowTopBar" />
		<MenuVerticalChildren v-if="config.pageConfig.layoutMode === 'Double'" />
		<MenuVertical v-else />
	</el-aside>
</template>

<script setup>
import { computed } from 'vue'

import { usePageConfig } from '@/stores/pageConfig'
import MenuVertical from './menus/menuVertical.vue'
import MenuVerticalChildren from './menus/menuVerticalChildren.vue'
import Logo from './logo.vue'

const config = usePageConfig()
const menuWidth = computed(() => config.menuWidth())
</script>

<style lang="scss" scoped>
.layout-aside-Default {
	background: var(--wti-bg-color-overlay);
	margin: var(--wti-normal-spacing) 0 var(--wti-normal-spacing) var(--wti-normal-spacing);
	height: calc(100vh - var(--wti-normal-spacing) - var(--wti-normal-spacing));
	box-shadow: var(--el-box-shadow-light);
	border-radius: var(--el-border-radius-base);
	overflow: hidden;
	transition: width 0.3s ease;
	width: v-bind(menuWidth);
}

.layout-aside-Classic,
.layout-aside-Double {
	background: var(--wti-bg-color-overlay);
	margin: 0;
	height: 100vh;
	overflow: hidden;
	transition: width 0.3s ease;
	width: v-bind(menuWidth);
}
</style>
