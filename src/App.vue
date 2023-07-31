<!-- src/App.vue -->
<script setup>
	import { useUser } from "@/stores/index";
	import { storeToRefs } from "pinia"; // 保持响应式
	import { ref } from "vue";
	const welcome = ref("Hello vue");

	const user = useUser();
	// 默认情况下，您可以通过 store 实例访问状态来直接读取和写入状态：
	const addUserAge = () => {
		// 方式一：非解构修改数据
		// user.age++;
		// 方式二：非解构修改数据
		user.$patch(state => {
			state.age += 1;
		});
	};
</script>

<template>
	<div>{{ welcome }}</div>
	<RouterLink to="/home">Home {{ user.name }} {{ user.age }}</RouterLink>
	<button @click="addUserAge">过生日</button>
	<RouterView></RouterView>
</template>

<style lang="less" scoped></style>
