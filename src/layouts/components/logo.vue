<template>
	<div class="layout-logo">
		<img v-if="!config.pageConfig.menuCollapse" class="logo-img" src="@/assets/icon.png" alt="" />
		<div v-if="!config.pageConfig.menuCollapse" class="website-name">系统模板演示站</div>
		<el-icon v-if="config.pageConfig.layoutMode !== 'Streamline'" class="fold" @click="onMenuCollapse">
			<component :is="!config.pageConfig.menuCollapse ? 'ElIconFold' : 'ElIconExpand'"></component>
		</el-icon>
	</div>
</template>

<script setup>
import { usePageConfig } from '@/stores/pageConfig'
import { setNavTabsWidth } from '@/utils/layout'

const config = usePageConfig()

const onMenuCollapse = function () {
	config.setPageConfig('menuCollapse', !config.pageConfig.menuCollapse)
	// 等待侧边栏动画结束后重新计算导航栏宽度
	setTimeout(() => {
		setNavTabsWidth()
	}, 350)
}
</script>

<style lang="scss" scoped>
.layout-logo {
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	padding: 10px;
	background: v-bind(
		'config.pageConfig.layoutMode != "Streamline" ?  config.getColorVal("menuTopBarBackground"):"transparent"'
	);

	.logo-img {
		width: 28px;
	}

	.website-name {
		display: block;
		width: 180px;
		padding-left: 4px;
		font-size: var(--el-font-size-extra-large);
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.fold {
		font-size: var(--el-font-size-extra-large);
	}
}
</style>
