

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { authen } from './plugins/authen'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap"
import 'bootstrap-icons/font/bootstrap-icons.css'
const app = createApp(App)

app.use(createPinia())

authen.install().then(() => {
    app.use(router)
    app.mount('#app')
})


