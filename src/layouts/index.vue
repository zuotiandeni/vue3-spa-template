<template>
	<component :is="pageConfig.pageConfig.layoutMode"></component>
</template>

<script setup>
import { onMounted } from 'vue'
import { staticRoutes } from '@/router/static'
import { useEventListener } from '@vueuse/core'

import { usePageConfig } from '@/stores/pageConfig'
import { useNavTabs } from '@/stores/navTabs'
import Default from '@/layouts/container/default.vue'
import Classic from '@/layouts/container/classic.vue'
import Streamline from '@/layouts/container/streamline.vue'
import Double from '@/layouts/container/double.vue'
import { cloneDeep } from 'lodash'
import { setNavTabsWidth } from '@/utils/layout'

const pageConfig = usePageConfig()
const navTabs = useNavTabs()
// 获取路由
const initRoute = () => {
	// TODO: 从后台获取动态路由列表...
	// 处理路由数据
	console.log(staticRoutes[0].children)
	navTabs.setTabsViewRoutes(cloneDeep(staticRoutes[0].children))
}

onMounted(() => {
	initRoute()
	setNavTabsWidth()
	useEventListener(window, 'resize', setNavTabsWidth)
})

defineOptions({
	name: 'layout/index',
	components: { Default, Classic, Streamline, Double },
})
</script>

<!-- 只有在 components 选项中的组件可以被动态组件使用-->
<!-- <script>
export default {
	components: { Default, Classic, Streamline },
}
</script> -->
