<template>
	<el-container class="layout-container">
		<Aside />
		<el-container class="content-wrapper">
			<Header />
			<Main />
		</el-container>
	</el-container>
</template>

<script setup>
import Aside from '../components/aside.vue'
import Header from '../components/header.vue'
import Main from '../router-view/main.vue'
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
