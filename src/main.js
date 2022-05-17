import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import locale  from 'element-plus/lib/locale/lang/zh-CN'
import { createPinia } from 'pinia';
import 'element-plus/dist/index.css'
import animated from 'animate.css'

import '@/router/guard'
import '@/layouts/theme'

const app = createApp(App)

app.use(router)
app.use(animated)
app.use(createPinia())
app.use(ElementPlus, {locale })
app.mount('#app')
