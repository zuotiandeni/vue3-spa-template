import { useDark, useToggle } from '@vueuse/core'
import { usePageConfig } from '@/stores/pageConfig'
// 必须把这个公共的pinia实例引入进来
import pinia from '@/stores/index'

// 为html添加class，实现应用暗黑模式
function updateHtmlDarkClass(val) {
	const htmlEl = document.getElementsByTagName('html')[0]
	if (val) {
		htmlEl.setAttribute('class', 'dark')
	} else {
		htmlEl.setAttribute('class', '')
	}
}

const isDark = useDark({
	onChanged(dark) {
		const pageConfig = usePageConfig(pinia)
		updateHtmlDarkClass(dark)
		pageConfig.setPageConfig('isDark', dark)
	},
})

/**
 * 切换暗黑模式
 */
const toggleDark = useToggle(isDark)

export default toggleDark
