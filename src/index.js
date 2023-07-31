// src/index.js
import { createApp } from "vue";
import router from "./router/index";
import App from "./App.vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import ElementPlus from "element-plus";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(ElementPlus, { size: "middle", zIndex: 3000 });
app.use(router);

app.mount("#app");
