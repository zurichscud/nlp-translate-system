import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import VueRouter from "vue-router";
import router from './router/router';
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
