<script setup>
import { storeToRefs } from 'pinia' // 保持响应式
import { useUser } from '@/stores/index'

import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()
const getWorkspaceData = () => {
	proxy.$axios.users
		.workbench({
			pageCurrent: '1',
			pageSize: '5',
			taskStatusList: [2],
			assigneeId: '15249264056',
		})
		.then(res => {
			console.log(res)
		})
}

getWorkspaceData()
getWorkspaceData()
getWorkspaceData()
getWorkspaceData()
setTimeout(() => {
	getWorkspaceData()
	getWorkspaceData()
	getWorkspaceData()
}, 2000)

const user = useUser()
// // 解构时，必须要storeToRefs
const { name, age, fatherAge } = storeToRefs(user)
// 默认情况下，您可以通过 store 实例访问状态来直接读取和写入状态：
const addUserAge = () => {
	age.value += 1
}
</script>

<template>
	<div class="home">
		<span>Home Page</span>
		<div>姓名：{{ name }}</div>
		<div>年龄：{{ age }}</div>
		<div>父亲年龄：{{ fatherAge }}</div>
		<button @click="addUserAge">过生日</button>
		<el-button type="success" round @click="user.addUserAge()">调用actions</el-button>
	</div>
</template>

<style lang="less" scoped>
.home {
	width: 200px;
	background-color: aquamarine;
}
</style>
