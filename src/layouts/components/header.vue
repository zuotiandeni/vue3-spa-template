<template>
	<el-header class="layout-header">
		<div class="nav-bar">
			<Tabs />
			<div style="margin-left: auto" @click="toggleDark()">黑夜模式切换</div>
		</div>
	</el-header>
</template>

<script setup>
import toggleDark from '@/utils/useDark'
import Tabs from './navBar/tabs.vue'
</script>

<style lang="scss" scoped>
.layout-header {
	height: auto;
	padding: 0;
	.nav-bar {
		display: flex;
		height: 50px;
		margin: calc(var(--wti-normal-spacing) + 4px) var(--wti-normal-spacing) 0 var(--wti-normal-spacing);
	}
}
</style>
