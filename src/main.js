import './assets/main.css'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import router from './router/router'
import App from './App.vue'
import 'element-plus/dist/index.css'


const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.mount("#app")


