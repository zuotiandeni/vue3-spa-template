import { useNavTabs } from '@/stores/navTabs'
import { usePageConfig } from '@/stores/pageConfig'

/**
 * main高度
 * @param extra main高度额外减去的px数,可以实现隐藏原有的滚动条
 * @returns CSSProperties
 */
export function mainHeight(extra = 0) {
	let height = extra
	const adminLayoutMainExtraHeight = {
		Default: 70,
		Classic: 50,
		Streamline: 60,
	}
	const config = usePageConfig()
	const navTabs = useNavTabs()
	if (!navTabs.navState.tabFullScreen) {
		height += adminLayoutMainExtraHeight[config.pageConfig.layoutMode]
	}
	return {
		height: 'calc(100vh - ' + height.toString() + 'px)',
	}
}

/**
 * 设置导航栏宽度
 * @returns
 */
// 在实例挂载后为navTabs设置一个min-width，防止宽度改变时闪现滚动条
export function setNavTabsWidth() {
	const navTabs = document.querySelector('.nav-bar-tabs')
	if (!navTabs) {
		return
	}
	const navBar = document.querySelector('.nav-bar')
	const navMenus = document.querySelector('.nav-menus')
	const minWidth = navBar.offsetWidth - (navMenus.offsetWidth + 20)
	navTabs.style.width = minWidth.toString() + 'px'
}
