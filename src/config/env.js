// api请求基路径
let baseURL = ''
const isProd = process.env.NODE_ENV !== 'development'

if (!isProd) {
	// 开发环境
	baseURL = '/api'
} else {
	// 生产环境
	baseURL = '/api'
}

export { baseURL }
