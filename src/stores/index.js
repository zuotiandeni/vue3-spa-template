import { defineStore } from 'pinia'

// 第一个参数是应用程序中 store 的唯一 id
const useUser = defineStore('useUser', {
	state: () => {
		return {
			age: 18,
			name: '小华',
		}
	},
	getters: {
		// 自动将返回类型推断为数字
		fatherAge(state) {
			return state.age + 18
		},
	},
	// 相当于vue中的methods，可以是异步的
	actions: {
		addUserAge() {
			this.age += 1
		},
	},
	// 持久化具体配置查看：https://prazdevs.github.io/pinia-plugin-persistedstate/guide/
	persist: {
		storage: sessionStorage, // 默认被存储在localstorage中
	},
})
export default {
	useUser,
}
