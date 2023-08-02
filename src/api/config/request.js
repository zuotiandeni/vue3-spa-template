import axios from 'axios'
import { ElLoading } from 'element-plus'
import showMessage from './message.js'

// 必须手动引入样式
import 'element-plus/es/components/loading/style/css'
import _lodash from 'lodash'
import { baseURL } from '../../config/env.js'

// loading对象
let loading
// 当前正在请求的数量
let underwayRequestCount = 0

// 显示loading
const showLoading = target => {
	// 后面这个判断很重要，因为关闭时加了抖动，此时loading对象可能还存在，
	// 但underwayRequestCount已经变成0.避免这种情况下会重新创建个loading
	if (underwayRequestCount === 0 && !loading) {
		loading = ElLoading.service({
			lock: true,
			text: 'Loading...',
			background: 'rgba(255, 255, 255, 0.5)',
			target: target || 'body',
		})
	}
	underwayRequestCount++
}

// 隐藏loading
const hideLoading = () => {
	underwayRequestCount--
	underwayRequestCount = Math.max(underwayRequestCount, 0) // 做个保护
	if (underwayRequestCount === 0) {
		// 关闭loading
		toHideLoading()
	}
}

// 防抖：将 300ms 间隔内的关闭 loading 合并为一次。防止连续请求时， loading闪烁的问题。
let toHideLoading = _lodash.debounce(() => {
	loading.close()
	loading = null
}, 300)

// 请求成功
const requestSuccess = config => {
	console.log(config)
	// 判断当前请求是否设置了不显示Loading
	if (config.headers.showLoading !== false) {
		showLoading(config.headers.loadingTarget)
	}
	// 获取token，在请求中添加 token
	let token = ''
	if (sessionStorage.getItem('wti-manager-token')) {
		token = sessionStorage.getItem('wti-manager-token')
		token = token ? '' + token : ''
	}
	config.headers.Authorization = token
	return config
}

// 请求失败
const requestFault = err => {
	// 判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
	if (err.config.headers.showLoading !== false) {
		hideLoading()
	}
	showMessage.error('请求超时!')
	return Promise.resolve(err)
}

// 响应成功
const responseSuccess = response => {
	// 判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
	if (response.config.headers.showLoading !== false) {
		hideLoading()
	}
	// 如果用户登录过期了
	if (response.data.code === 401) {
		showMessage({
			message: '登陆认证已过期,请重新登陆！',
			type: 'warning',
		})
		//  如果不是请求成功
	} else if (response.data.code !== 200 && response.data.code !== 201) {
		showMessage({
			message: response.data.msg,
			type: 'warning',
		})
	}
	return response.data
}

// 响应失败
const responseFault = error => {
	// 判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
	if (error.config.headers.showLoading !== false) {
		hideLoading()
	}
	// 对错误数据进行处理
	if (error.response && error.response.data && error.response.data.message) {
		let jsonObj = JSON.parse(error.response.data.message)
		showMessage.error(jsonObj.message)
	} else {
		showMessage.error(error.message)
	}
	return Promise.reject(error)
}

// 设置axios的默认项
axios.defaults.baseURL = baseURL
axios.defaults.timeout = 40000
axios.interceptors.request.use(requestSuccess, requestFault)
axios.interceptors.response.use(responseSuccess, responseFault)

// 生成 axios 对象
const generateAxios = config => {
	const newAxios = axios.create(config)
	newAxios.interceptors.request.use(requestSuccess, requestFault)
	newAxios.interceptors.response.use(responseSuccess, responseFault)
	return newAxios
}

const post = (url, data, headers) => {
	return axios({
		method: 'post',
		url,
		headers,
		data,
	})
}

const get = (url, params, headers) => {
	return axios({
		method: 'get',
		url,
		headers,
		params,
	})
}

export { generateAxios, post, get }
