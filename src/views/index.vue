<template>
	<div>
		index页面
		<el-button @click="setLayoutMode('Default')">默认布局</el-button>
		<el-button @click="setLayoutMode('Classic')">经典布局</el-button>
		<el-button @click="setLayoutMode('Streamline')">单栏布局</el-button>
		<el-button @click="setLayoutMode('Double')">双栏布局</el-button>
	</div>
</template>

<script setup>
import { usePageConfig } from '@/stores/pageConfig'
import { setNavTabsWidth } from '@/utils/layout'
import { nextTick } from 'vue'

const config = usePageConfig()

const setLayoutMode = function (mode) {
	config.setLayoutMode(mode)
	// 重新计算导航栏宽度
	nextTick(() => {
		setNavTabsWidth()
	})
}
</script>
