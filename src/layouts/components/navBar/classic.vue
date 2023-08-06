<template>
	<div class="nav-bar">
		<Tabs />
		<div class="nav-menus">
			<div @click="toggleDark()">黑夜模式切换</div>
			<div>admin</div>
		</div>
	</div>
</template>

<script setup>
import toggleDark from '@/utils/useDark'
import Tabs from './tabs.vue'

import { usePageConfig } from '@/stores/pageConfig'

const config = usePageConfig()
</script>

<style lang="scss" scoped>
.nav-menus {
	display: flex;
	margin-left: auto;
	white-space: nowrap;
}

.nav-bar {
	display: flex;
	height: 50px;
	width: 100%;
	background-color: v-bind('config.getColorVal("headerBarBackground")');
	:deep(.nav-bar-tabs) {
		display: flex;
		height: 100%;
		position: relative;
		.nav-bar-tabs-item {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 20px;
			cursor: pointer;
			z-index: 1;
			height: 100%;
			user-select: none;
			color: v-bind('config.getColorVal("headerBarTabColor")');
			transition: all 0.2s;
			-webkit-transition: all 0.2s;
			.close-icon {
				padding: 2px;
				margin: 2px 0 0 4px;
			}
			.close-icon:hover {
				background: var(--wti-color-primary-light);
				color: var(--el-border-color) !important;
				border-radius: 50%;
			}
			&.active {
				color: v-bind('config.getColorVal("headerBarTabActiveColor")');
			}
			&:hover {
				background-color: v-bind('config.getColorVal("headerBarHoverBackground")');
			}
		}
		.nav-tabs-active-box {
			position: absolute;
			height: 50px;
			background-color: v-bind('config.getColorVal("headerBarTabActiveBackground")');
			transition: all 0.2s;
			-webkit-transition: all 0.2s;
		}
	}
}
</style>
