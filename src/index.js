// src/index.js
import { createApp } from "vue";
import router from "./router/index";
import App from "./App.vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";

const app = createApp(App);

app.use(createPinia());
app.use(ElementPlus, { size: "middle", zIndex: 3000 });
app.use(router);

app.mount("#app");
