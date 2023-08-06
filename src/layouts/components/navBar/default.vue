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
import { usePageConfig } from '@/stores/pageConfig'
import Tabs from './tabs.vue'

const config = usePageConfig()
</script>

<style lang="scss" scoped>
.nav-bar {
	display: flex;
	height: 50px;
	margin: 20px var(--wti-normal-spacing) 0 var(--wti-normal-spacing);

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
			user-select: none;
			opacity: 0.7;
			color: v-bind('config.getColorVal("headerBarTabColor")');
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
				opacity: 1;
			}
		}
		.nav-tabs-active-box {
			position: absolute;
			height: 40px;
			border-radius: var(--el-border-radius-base);
			background-color: v-bind('config.getColorVal("headerBarTabActiveBackground")');
			box-shadow: var(--el-box-shadow-light);
			transition: all 0.2s;
			-webkit-transition: all 0.2s;
		}
	}
}
.nav-menus {
	display: flex;
	margin-left: auto;
	white-space: nowrap;
}
</style>
