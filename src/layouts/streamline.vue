<template>
	<el-container class="layout-container">
		<el-container class="content-wrapper">
			<Header />
			<Main />
		</el-container>
	</el-container>
</template>

<script setup>
import Header from './components/header.vue'
import Main from './components/main.vue'
import { useNavTabs } from '@/stores/navTabs'
const navTabs = useNavTabs()
</script>

<style scoped>
.layout-container {
	height: 100%;
	width: 100%;
}
.content-wrapper {
	flex-direction: column;
	width: 100%;
	height: 100%;
}
</style>
