import { defineStore } from "pinia";

// 第一个参数是应用程序中 store 的唯一 id
export const useUser = defineStore("useUser", {
	state: () => {
		return {
			age: 18,
			name: "小华",
		};
	},
	getters: {
		// 自动将返回类型推断为数字
		fatherAge(state) {
			return state.age + 18;
		},
	},
	// 相当于vue中的methods，可以是异步的
	actions: {
		addUserAge() {
			this.age++;
		},
	},
});
