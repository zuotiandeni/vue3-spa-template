<template>
	<component :is="pageConfig.pageConfig.layoutMode"></component>
</template>

<script setup>
import { onMounted } from 'vue'
import { staticRoutes } from '@/router/static'

import { usePageConfig } from '@/stores/pageConfig'
import { useNavTabs } from '@/stores/navTabs'
import Default from '@/layouts/default.vue'

const pageConfig = usePageConfig()
const navTabs = useNavTabs()
// 获取路由
const initRoute = () => {
	// TODO: 从后台获取动态路由列表...
	// 处理路由数据
	navTabs.setTabsViewRoutes(staticRoutes[0].children)
}

onMounted(() => {
	initRoute()
})
</script>

<!-- 只有在 components 选项中的组件可以被动态组件使用-->
<script>
export default {
	components: { Default },
}
</script>
