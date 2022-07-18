import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './route/index'
import { createPinia, PiniaVuePlugin } from 'pinia'
import './main.scss'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(PiniaVuePlugin)
const pinia = createPinia()


new Vue({
  router,
  pinia,
  render: h => h(App),
}).$mount('#app')
