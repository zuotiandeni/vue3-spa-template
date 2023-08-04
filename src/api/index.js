// api/index.ts
// 读取文件，webpack中需要使用：
// 需要再webpack.config.js的module配置：unknownContextCritical: false,
const requireComponent = require.context('./business/', false, /\.js$/)

const modules = {}
requireComponent.keys().forEach(key => {
	console.log(requireComponent(key))
	const moduleName = key.split('.').slice(0, -1).join('.').split('./')[1]
	modules[moduleName] = requireComponent(key)
})

console.log(modules)

export default {
	modules,
}
