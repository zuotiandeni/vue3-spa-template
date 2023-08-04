<template>
	<el-config-provider :message="messageMax">
		<RouterView></RouterView>
	</el-config-provider>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { setTitleFromRoute } from '@/utils/common'

const messageMax = reactive({
	max: 3,
})
const route = useRoute()
// 监听路由变化时更新浏览器标题
watch(
	() => route.path,
	() => {
		setTitleFromRoute()
	},
)
</script>

<style lang="scss" scoped></style>
