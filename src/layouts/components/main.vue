<template>
	<el-main class="layout-main">
		<el-scrollbar class="layout-main-scrollbar" :style="layoutMainScrollbarStyle()" ref="mainScrollbarRef">
			<router-view v-slot="{ Component }">
				<transition :name="config.pageConfig.mainAnimation" mode="out-in">
					<keep-alive :include="state.keepAliveComponentNameList">
						<component :is="Component" :key="state.componentKey" />
					</keep-alive>
				</transition>
			</router-view>
		</el-scrollbar>
	</el-main>
</template>

<script setup>
import { usePageConfig } from '@/stores/pageConfig'
import { mainHeight as layoutMainScrollbarStyle } from '@/utils/layout'
import { reactive, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useNavTabs } from '@/stores/navTabs'

const config = usePageConfig()
const route = useRoute()
const navTabs = useNavTabs()

const state = reactive({
	componentKey: route.path,
	keepAliveComponentNameList: [],
})

// 添加keep-alive的路由信息
const addKeepAliveComponentName = function (keepAliveName) {
	if (keepAliveName) {
		let exist = state.keepAliveComponentNameList.find(name => {
			return name === keepAliveName
		})
		// 如果已经添加过了，则直接去return
		if (exist) return
		state.keepAliveComponentNameList.push(keepAliveName)
	}
}

// 监听路由变化，去添加到keep-alive的列表中去
watchEffect(() => {
	state.componentKey = route.path
	if (typeof navTabs.navState.activeRoute.meta.keepalive === 'string') {
		addKeepAliveComponentName(navTabs.navState.activeRoute?.meta.keepalive)
	}
})
</script>

<style lang="scss" scoped>
.layout-main {
	padding: 0 !important;

	:deep(.el-scrollbar__view) {
		margin: var(--wti-normal-spacing);
	}
}
</style>
