<template>
	<el-header class="layout-header">
		<component :is="config.pageConfig.layoutMode + 'NavBar'"></component>
	</el-header>
</template>

<script setup>
import DefaultNavBar from './navBar/default.vue'
import ClassicNavBar from './navBar/classic.vue'
import DoubleNavBar from './navBar/double.vue'
import StreamlineNavBar from './menus/menuHorizontal.vue'
import { usePageConfig } from '@/stores/pageConfig'

defineOptions({
	name: 'layout/header',
	components: { DefaultNavBar, ClassicNavBar, StreamlineNavBar, DoubleNavBar },
})

const config = usePageConfig()
</script>

<style lang="scss" scoped>
.layout-header {
	height: auto;
	padding: 0;
}
</style>
