// src/index.js
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import pinia from '@/stores/index'
import router from './router/index'
import App from './App.vue'
// API的所有文件
import api from './api/index'
// 暗黑模式所需要的(在darkVar.scss中引入了scss，这里就不需要了)
// import 'element-plus/theme-chalk/dark/css-vars.css'
// 自定义样式
import '@/styles/index.scss'

const app = createApp(App)
// vue3挂载全局属性需要使用 config.globalProperties
app.config.globalProperties.$axios = api.modules

// 注册所有图标
Object.keys(ElementPlusIconsVue).forEach(key => {
	app.component(`ElIcon${key}`, ElementPlusIconsVue[key])
})

app.use(pinia)
app.use(ElementPlus, { size: 'middle', zIndex: 3000 })
app.use(router)

app.mount('#app')
