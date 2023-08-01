// src/index.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import router from './router/index'
import App from './App.vue'
// API的所有文件
import api from './api/index'

const app = createApp(App)
// vue3挂载全局属性需要使用 config.globalProperties
app.config.globalProperties.$axios = api.modules

// pinia持久化
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(ElementPlus, { size: 'middle', zIndex: 3000 })
app.use(router)

app.mount('#app')
