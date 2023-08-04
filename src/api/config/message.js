import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
// 必须手动引入样式

const showMessage = options => {
	const messageDom = document.getElementsByClassName('el-message')[0]
	if (messageDom === undefined) {
		ElMessage(options)
	}
}
const arr = ['success', 'warning', 'info', 'error']
arr.forEach(type => {
	showMessage[type] = options => {
		const messageDom = document.getElementsByClassName('el-message')[0]
		if (messageDom === undefined) {
			ElMessage[type](options)
		}
	}
})
export default showMessage
