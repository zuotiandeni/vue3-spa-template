import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { STORE_CONFIG } from './constant/cacheKey'

export const usePageConfig = defineStore(
	'pageConfig',
	() => {
		const pageConfig = reactive({
			// 是否黑暗模式
			isDark: false,
			// 页面布局方式，可选值：<Default|Classic>，
			layoutMode: 'Default',
			// 后台主页面切换动画，可选值<slide-right|slide-left|el-fade-in-linear|el-fade-in|el-zoom-in-center|el-zoom-in-top|el-zoom-in-bottom>
			mainAnimation: 'slide-right',
			// 显示菜单栏顶栏(LOGO)
			menuShowTopBar: true,
			// 是否只保持一个子菜单的展开(手风琴)
			menuUniqueOpened: false,
			// 是否水平折叠收起菜单
			menuCollapse: false,
			menuWidth: 260,
			// 侧边菜单项默认图标
			menuDefaultIcon: 'ElIconMinus',

			/* 侧边菜单 */
			// 侧边菜单背景色
			menuBackground: ['#ffffff', '#1d1e1f'],
			// 侧边菜单文字颜色
			menuColor: ['#303133', '#CFD3DC'],
			// 侧边菜单激活项背景色
			menuActiveBackground: ['#ffffff', '#1d1e1f'],
			// 侧边菜单激活项文字色
			menuActiveColor: ['#409eff', '#3375b9'],
			// 侧边菜单顶栏背景色
			menuTopBarBackground: ['#fcfcfc', '#1d1e1f'],

			/* 顶栏 */
			// 顶栏文字色
			headerBarTabColor: ['#000000', '#CFD3DC'],
			// 顶栏激活项背景色
			headerBarTabActiveBackground: ['#ffffff', '#1d1e1f'],
			// 顶栏激活项文字色
			headerBarTabActiveColor: ['#000000', '#409EFF'],
			// 顶栏背景色
			headerBarBackground: ['#ffffff', '#1d1e1f'],
			// 顶栏悬停时背景色
			headerBarHoverBackground: ['#f5f5f5', '#18222c'],
		})
		// 设置页面相关属性
		function setPageConfig(name, value) {
			pageConfig[name] = value
		}

		// menu宽度
		function menuWidth() {
			// 菜单是否折叠
			return pageConfig.menuCollapse ? '64px' : `${pageConfig.menuWidth}px`
		}

		// 获取颜色配置
		function getColorVal(name) {
			const colors = pageConfig[name]
			if (pageConfig.isDark) {
				return colors[1]
			}
			return colors[0]
		}

		function onSetLayoutColor(data = pageConfig.layoutMode) {
			// 切换布局时，如果是为默认配色方案，对菜单激活背景色重新赋值
			const tempValue = pageConfig.isDark
				? { idx: 1, color: '#1d1e1f', newColor: '#141414' }
				: { idx: 0, color: '#ffffff', newColor: '#f5f5f5' }
			if (
				data == 'Classic' &&
				pageConfig.headerBarBackground[tempValue.idx] == tempValue.color &&
				pageConfig.headerBarTabActiveBackground[tempValue.idx] == tempValue.color
			) {
				pageConfig.headerBarTabActiveBackground[tempValue.idx] = tempValue.newColor
			} else if (
				data == 'Default' &&
				pageConfig.headerBarBackground[tempValue.idx] == tempValue.color &&
				pageConfig.headerBarTabActiveBackground[tempValue.idx] == tempValue.newColor
			) {
				pageConfig.headerBarTabActiveBackground[tempValue.idx] = tempValue.color
			}

			console.log(pageConfig.headerBarTabActiveBackground)
		}

		function setLayoutMode(data) {
			pageConfig.layoutMode = data
			onSetLayoutColor(data)
		}

		return { pageConfig, setPageConfig, menuWidth, getColorVal, onSetLayoutColor, setLayoutMode }
	},
	{
		persist: {
			// 页面配置相关的信息就存在localstorage中就可以了
			// storage: sessionStorage, // 默认被存储在localstorage中
			key: STORE_CONFIG,
		},
	},
)
