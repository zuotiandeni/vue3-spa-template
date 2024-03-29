<template>
	<div class="nav-bar-tabs" ref="tabScrollbarRef">
		<div
			v-for="(tab, index) in navTabs.navState.tabsView"
			class="nav-bar-tabs-item"
			:key="tab.path"
			:ref="tabsRefs.set"
			@click="onTab(tab)"
			:class="navTabs.navState.activeIndex == index ? 'active' : ''"
		>
			{{ tab.meta.title }}
			<transition @after-leave="selectNavTab(tabsRefs[navTabs.navState.activeIndex])" name="el-fade-in">
				<el-icon
					v-show="navTabs.navState.tabsView.length > 1"
					class="close-icon"
					@click.stop="closeTab(tab, index)"
					size="15"
				>
					<ElIconClose />
				</el-icon>
			</transition>
		</div>
		<div :style="activeBoxStyle" class="nav-tabs-active-box"></div>
	</div>
</template>

<script setup>
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import { nextTick, onMounted, reactive, ref } from 'vue'
import { useTemplateRefsList } from '@vueuse/core'

import { useNavTabs } from '@/stores/navTabs'
import { usePageConfig } from '@/stores/pageConfig'

const navTabs = useNavTabs()
const router = useRouter()
const config = usePageConfig()
// 点击跳转
const onTab = menuItem => {
	router.push(menuItem)
}
// 如果是关闭当前窗口，则跳转到前一个窗口
const toLastTab = () => {
	const lastTab = navTabs.navState.tabsView.slice(-1)[0]
	if (lastTab) {
		router.push(lastTab.path)
	} else {
		router.push('/')
	}
}

// 滑块儿
const activeBoxStyle = reactive({
	width: '0',
	transform: 'translateX(0px)',
})
const tabScrollbarRef = ref()
const tabsRefs = useTemplateRefsList()

// tab 激活状态切换
const selectNavTab = dom => {
	console.log(dom)
	if (!dom) {
		return
	}
	activeBoxStyle.width = `${dom.clientWidth}px`
	activeBoxStyle.transform = `translateX(${dom.offsetLeft}px)`

	const scrollLeft = dom.offsetLeft + dom.clientWidth - tabScrollbarRef.value.clientWidth
	if (dom.offsetLeft < tabScrollbarRef.value.scrollLeft) {
		tabScrollbarRef.value.scrollTo(dom.offsetLeft, 0)
	} else if (scrollLeft > tabScrollbarRef.value.scrollLeft) {
		tabScrollbarRef.value.scrollTo(scrollLeft, 0)
	}
}
// 关闭当前tab
const closeTab = (route, index) => {
	navTabs.closeTab(index)
	// 判断关闭的是不是当前打开的窗口
	if (navTabs.navState.activeRoute?.path === route.path) {
		toLastTab()
	} else {
		navTabs.setActiveRoute(navTabs.navState.activeRoute)
		nextTick(() => {
			selectNavTab(tabsRefs.value[navTabs.navState.activeIndex])
		})
	}
}

const updateTab = newRoute => {
	// 添加tab
	console.log(newRoute, 'newRoute')
	navTabs.addTab(newRoute)
	// 激活当前tab
	navTabs.setActiveRoute(newRoute)

	nextTick(() => {
		selectNavTab(tabsRefs.value[navTabs.navState.activeIndex])
	})
}

onBeforeRouteUpdate(async to => {
	updateTab(to)
})
onMounted(() => {
	updateTab(router.currentRoute.value)
})
</script>

<style lang="scss" scoped>
.dark {
	.close-icon {
		color: v-bind('config.getColorVal("headerBarTabColor")') !important;
	}
	.nav-bar-tabs-item.active {
		.close-icon {
			color: v-bind('config.getColorVal("headerBarTabActiveColor")') !important;
		}
	}
}
.nav-bar-tabs {
	display: flex;
	height: 100%;
	position: relative;
	overflow-x: auto;
	overflow-y: hidden;

	&-item {
		white-space: nowrap;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 20px;
		cursor: pointer;
		z-index: 1;
		user-select: none;
		opacity: 0.7;
	}

	// .nav-tabs-active-box {
	// 	position: absolute;
	// 	height: 50px;
	// 	background-color: var(--wti-bg-color-overlay);
	// 	transition: all 0.2s;
	// 	-webkit-transition: all 0.2s;
	// }
}
</style>
